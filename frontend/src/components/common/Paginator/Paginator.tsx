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
  total: number;
  currentPage?: number;
  queryParams?: object;
  limit: number;
}

function Paginator({
  className,
  total,
  currentPage,
  queryParams,
  limit,
}: IPaginatorProps) {
  return (
    <div
      className={`${className} ${styles.container} ${sourceSansPro.className}`}
    >
      {currentPage && currentPage > 1 && (
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...queryParams,
              page: currentPage - 1,
            },
          }}
          className={styles.link}
        >
          <FaLongArrowAltLeft className={styles.icon} />
        </Link>
      )}
      {total > 1 && (
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...queryParams,
              page: 1,
            },
          }}
          className={`${styles.active} ${styles.link}`}
        >
          1
        </Link>
      )}
      {total > 2 && (
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...queryParams,
              page: 2,
            },
          }}
          className={styles.link}
        >
          2
        </Link>
      )}
      {total > 5 && <span className={styles.link}>...</span>}
      {total - 2 > 5 && (
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...queryParams,
              page: total / limit,
            },
          }}
          className={styles.link}
        >
          23
        </Link>
      )}
      {currentPage && currentPage < total / limit && (
        <Link href="" className={styles.link}>
          <FaLongArrowAltRight className={styles.icon} />
        </Link>
      )}
    </div>
  );
}

export default Paginator;
