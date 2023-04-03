import React from "react";
import { BsFilter } from "react-icons/bs";
import styles from "./FilterNSort.module.css";

function FilterNSort() {
  return (
    <div className={styles.container}>
      <details>
        <summary>
          <span>Filter & Sort</span> <BsFilter className={styles.icon} />
        </summary>
        <div>
          <div className={styles.left}></div>
          <div className={styles.right}>
            <div>
              Date{" "}
              <select name="date_order" id="date_order" defaultValue={"asc"}>
                <option value="asc"></option>
                <option value="desc"></option>
              </select>
            </div>
            <div>
              Title{" "}
              <select name="date_order" id="date_order" defaultValue={"asc"}>
                <option value="asc"></option>
                <option value="desc"></option>
              </select>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

export default FilterNSort;
