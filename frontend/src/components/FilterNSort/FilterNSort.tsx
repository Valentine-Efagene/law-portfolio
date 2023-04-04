"use client";
import React, { useState, ChangeEventHandler, ChangeEvent } from "react";
import { BiFilter } from "react-icons/bi";
import { FaRegCheckSquare } from "react-icons/fa";
import styles from "./FilterNSort.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import { FaChevronDown } from "react-icons/fa";
import CustomCheck from "../common/CustomCheck";

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
}

function FilterNSort({ authors, categories, className }: IFilterSortProps) {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [filterField, setFilterField] = useState<"authors" | "categories">(
    "authors"
  );

  const handleFilterFieldChange: ChangeEventHandler = (e) => {
    setFilterField(
      (e.target as HTMLInputElement)?.value as "authors" | "categories"
    );
  };

  const handleCheckAuthorChange: ChangeEventHandler = (e) => {
    const { checked, value } = e.target as HTMLInputElement;

    setSelectedAuthors((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((id) => id !== value);
      }
    });
  };

  const handleCheckCatChange: ChangeEventHandler = (e) => {
    const { checked, value } = e.target as HTMLInputElement;

    setSelectedCategories((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((id) => id !== value);
      }
    });
  };

  return (
    <div
      className={`${className} ${sourceSansPro.className} ${styles.container}`}
    >
      <details>
        <summary className={`${rubik.className}`}>
          <span>Filter & Sort</span>{" "}
          <BiFilter className={styles.icon} fontSize="1.5rem" />
        </summary>
        <div className={styles.filterNSortBar}>
          <div className={styles.filter}>
            <input
              onChange={handleFilterFieldChange}
              hidden
              type="radio"
              name="filter"
              id="authors"
              value="authors"
            />
            <label htmlFor="author">
              Author <FaChevronDown className={styles.icon} />
            </label>
            <input
              hidden
              type="radio"
              name="filter"
              id="categories"
              value="categories"
            />
            <label htmlFor="category">
              Category <FaChevronDown className={styles.icon} />
            </label>
          </div>
          <div className={styles.sort}>
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
          </div>
        </div>
        <div className={styles.content}>
          {filterField === "authors" &&
            authors.map(({ _id, name }) => (
              <CustomCheck
                label={name}
                key={_id}
                id={_id}
                name={_id}
                value={_id}
                onChange={handleCheckAuthorChange}
              />
            ))}

          {filterField === "categories" &&
            categories.map(({ _id, title }) => (
              <CustomCheck
                key={_id}
                label={title}
                id={_id}
                name={_id}
                value={_id}
                onChange={handleCheckCatChange}
              />
            ))}
        </div>
      </details>
    </div>
  );
}

export default FilterNSort;
