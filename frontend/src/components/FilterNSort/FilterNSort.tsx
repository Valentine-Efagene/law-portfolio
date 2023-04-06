"use client";

import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import { BiFilter } from "react-icons/bi";
import styles from "./FilterNSort.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import { FaChevronDown } from "react-icons/fa";
import CustomCheck from "../common/CustomCheck";
import Link from "next/link";

const sourceSansPro = Source_Sans_Pro({
  weight: "400",
  subsets: ["latin"],
  variable: "--source-sans-pro",
});

const rubik = Rubik({
  weight: "600",
  subsets: ["latin"],
  variable: "--rubik",
});

const playfairDisplay = Playfair_Display({
  weight: "600",
  subsets: ["latin"],
  variable: "--playfair-display",
});

interface IFilterSortProps {
  authors: { name: string; _id: string }[];
  categories: { title: string; _id: string }[];
  className?: string;
  slug?: string;
  currentAuthor?: string;
  currentCategory?: string;
}

function FilterNSort({
  authors,
  categories,
  className,
  currentAuthor,
  currentCategory,
}: IFilterSortProps) {
  const [targetAuthor, setTargetAuthor] = useState<string | null | undefined>(
    currentAuthor
  );
  const [targetCat, setTargetCat] = useState<string | null | undefined>(
    currentCategory
  );

  const [filterField, setFilterField] = useState<"author" | "category" | null>(
    "author"
  );

  const handleFilterFieldChange: ChangeEventHandler = (e) => {
    setFilterField((prevState) => {
      const value = (e.target as HTMLInputElement)?.value as
        | "author"
        | "category";

      if (prevState === value) {
        return null;
      }

      return value;
    });
  };

  const handleRadioAuthorChange: ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    setTargetAuthor((prevState) => (prevState === value ? null : value));
  };

  const handleRadioCatChange: ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    setTargetCat((prevState) => (prevState === value ? null : value));
  };

  const queryParams: { [key: string]: string | number } = {};

  if (targetAuthor) {
    queryParams["author"] = targetAuthor;
  }

  if (targetCat) {
    queryParams["category"] = targetCat;
  }

  return (
    <div
      className={`${className} ${sourceSansPro.className} ${styles.container}`}
    >
      <details>
        <summary className={`${rubik.className}`}>
          {/* <span>Filter & Sort</span>{" "} */}
          <span>Filter</span>{" "}
          <BiFilter className={styles.icon} fontSize="1.5rem" />
        </summary>
        <div className={styles.filterNSortBar}>
          <div className={styles.filter}>
            <input
              onChange={handleFilterFieldChange}
              hidden
              type="checkbox"
              name="filter"
              id="author"
              value="author"
              checked={filterField === "author"}
            />
            <label htmlFor="author">
              Author <FaChevronDown className={styles.icon} />
            </label>
            <input
              hidden
              checked={filterField === "category"}
              onChange={handleFilterFieldChange}
              type="checkbox"
              name="filter"
              id="category"
              value="category"
            />
            <label htmlFor="category">
              Category <FaChevronDown className={styles.icon} />
            </label>
          </div>
          {/* <div className={styles.sort}>
              <div>
                Title{" "}
                <select name="date_order" id="date_order" defaultValue="desc">
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </div>
              <div>
                Date{" "}
                <select name="name_order" id="name_order" defaultValue="asc">
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </div>
            </div> */}
        </div>
        <div className={styles.content}>
          {filterField === "author" &&
            authors.map(({ _id, name }) => (
              <CustomCheck
                className={styles.checkPill}
                label={name}
                key={_id}
                checked={targetAuthor === _id}
                id={_id}
                name={_id}
                value={_id}
                onChange={handleRadioAuthorChange}
              />
            ))}

          {filterField === "category" &&
            categories.map(({ _id, title }) => (
              <CustomCheck
                className={styles.checkPill}
                key={_id}
                checked={targetCat === _id}
                label={title}
                id={_id}
                name={_id}
                value={_id}
                onChange={handleRadioCatChange}
              />
            ))}
        </div>
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...queryParams,
            },
          }}
          //type="submit"
          className={`${rubik.className} ${styles.apply}`}
        >
          Apply
        </Link>
      </details>
    </div>
  );
}

export default FilterNSort;
