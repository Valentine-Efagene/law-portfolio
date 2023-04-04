"use client";
import React, { useState, ChangeEventHandler, ChangeEvent } from "react";
import { BiFilter } from "react-icons/bi";
import { FaRegCheckSquare, FaRegSquare, FaSquare } from "react-icons/fa";
import styles from "./CustomCheck.module.css";

import { FaChevronDown } from "react-icons/fa";

interface ICustomCheckProps {
  onChange: ChangeEventHandler;
  value?: string;
  id: string;
  name: string;
  label?: string;
}

function CustomCheck({ onChange, value, name, id, label }: ICustomCheckProps) {
  return (
    <div className={`${styles.container}`}>
      <input
        onChange={onChange}
        value={value}
        type="checkbox"
        hidden
        name={name}
        id={id}
      />
      <label htmlFor={id}>
        {label}
        <FaRegSquare className={styles.on} />{" "}
        <FaRegCheckSquare className={styles.off} />{" "}
      </label>
    </div>
  );
}

export default CustomCheck;
