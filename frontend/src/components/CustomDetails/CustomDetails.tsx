import React, { ReactNode, useState } from "react";
import styles from "./CustomDetails.module.css";

interface ICustomDetailsProps {
  children: ReactNode;
  summary: string;
  isOpen: boolean;
}

function CustomDetails({ summary, children, isOpen }: ICustomDetailsProps) {
  return (
    <div className={styles.container}>
      <button className={styles.summary}>{summary}</button>
      <div className={`${isOpen ? styles.open : null} ${styles.content}`}>
        {children}
      </div>
    </div>
  );
}

export default CustomDetails;
