import React from "react";
import styles from "./Image.module.css";
import NextImage from "next/image";

interface IImageProps {
  src: string;
  className?: string;
  style?: object;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export default function Image({
  src,
  alt = "",
  width,
  height,
  className,
  style,
  sizes,
  fill,
}: IImageProps) {
  return (
    <NextImage
      width={width}
      height={height}
      src={src}
      fill={fill}
      sizes={sizes}
      alt={alt}
      style={style}
      className={`${className} ${styles.container}`}
    />
  );
}
