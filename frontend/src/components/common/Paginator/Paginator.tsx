"use client";
import Link from "next/link";
import React from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import styles from "./Paginator.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";

const playfairDisplay = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--playfair-display",
});
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"], variable: "--rubik" });

interface IPaginatorProps {
  className?: string;
}

function Paginator({ className }: IPaginatorProps) {
  return (
    <div
      className={`${className} ${styles.container} ${sourceSansPro.className}`}
    >
      <Link href="" className={styles.link}>
        <FaLongArrowAltLeft className={styles.icon} />
      </Link>
      <Link href="" className={`${styles.active} ${styles.link}`}>
        1
      </Link>
      <Link href="" className={styles.link}>
        2
      </Link>
      <Link href="" className={styles.link}>
        ...
      </Link>
      <Link href="" className={styles.link}>
        23
      </Link>
      <Link href="" className={styles.link}>
        <FaLongArrowAltRight className={styles.icon} />
      </Link>
    </div>
  );
}

export default Paginator;
