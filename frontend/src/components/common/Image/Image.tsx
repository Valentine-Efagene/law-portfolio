import React from "react";
import styles from "./Image.module.css";

interface IImageProps {
  src: string;
  className?: string;
  style?: object;
  alt?: string;
  width?: number;
  height?: number;
}

export default function Image({
  src,
  alt = "",
  width,
  height,
  className,
  style,
}: IImageProps) {
  return (
    <img
      width={width}
      height={height}
      src={src}
      alt={alt}
      style={style}
      className={`${className} ${styles.container}`}
    />
  );
}
