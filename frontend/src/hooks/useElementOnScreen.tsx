import { useState, useEffect, useRef, useCallback } from "react";

/**
 *
 * @reference
 * https://dev.to/producthackers/intersection-observer-using-react-49ko
 *
 * @param {object} options
 * @param {func} cleanup
 * @returns
 */
const useElementOnScreen = (
  options?: object,
  cleanup?: boolean,
  ref: any = null
) => {
  let containerRef = useRef(ref);

  const [isVisible, setIsVisible] = useState();

  const callback = useCallback(
    (entries: any, observer: any) => {
      const [entry] = entries;
      setIsVisible((prevState) =>
        prevState === true ? prevState : entry.isIntersecting
      );

      if (cleanup && isVisible) {
        observer.disconnect();
      }
    },
    [cleanup, isVisible]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const element = containerRef.current;

    if (containerRef.current) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [containerRef, options, callback]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;
