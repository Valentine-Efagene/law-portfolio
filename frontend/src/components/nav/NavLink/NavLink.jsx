import React from "react";
import styles from "./NavLink.module.css";
import Link from "next/link";
import { bool, node, oneOfType, string } from "prop-types";

NavLink.propTypes = {
  className: string,
  isActive: bool,
  children: oneOfType([node, string]),
  href: string,
};

export default function NavLink({ href, className, isActive, children }) {
  return (
    <Link
      href={href}
      className={`${isActive ? styles.active : null} ${className} ${
        styles.container
      }`}
    >
      {children}
      <hr />
    </Link>
  );
}
