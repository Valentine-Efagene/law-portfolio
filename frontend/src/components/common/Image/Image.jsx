import { object, string } from "prop-types";
import React from "react";
import styles from "./Image.module.css";

Image.propTypes = {
  src: string,
  className: string,
  style: object,
  alt: string,
  href: string,
};

export default function Image({ src, alt, width, height, className, style }) {
  return (
    <img
      width={width}
      height={height}
      src={src}
      alt=""
      style={style}
      className={`${className} ${styles.container}`}
    />
  );
}
