"use client";
import React, { ChangeEventHandler } from "react";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import styles from "./CustomCheck.module.css";

interface ICustomCheckProps {
  onChange: ChangeEventHandler;
  value?: string;
  id: string;
  name: string;
  label?: string;
  checked?: boolean;
  className?: string;
}

const CustomCheck = ({
  onChange,
  value,
  name,
  id,
  checked = false,
  label,
  className,
}: ICustomCheckProps) => {
  return (
    <div className={`${className} ${styles.container}`}>
      <input
        onChange={onChange}
        value={value}
        type="checkbox"
        hidden
        name={name}
        checked={checked}
        id={id}
      />
      <label htmlFor={id}>
        {label}
        <FaRegSquare className={styles.off} />{" "}
        <FaRegCheckSquare className={styles.on} />{" "}
      </label>
    </div>
  );
};

export default CustomCheck;
