import React, { ReactNode } from "react";
import styles from "./NavLink.module.css";
import Link from "next/link";

interface INavLinkProps {
  className?: string;
  isActive?: boolean;
  children?: ReactNode;
  href: string;
}

export default function NavLink({
  href,
  className,
  isActive,
  children,
}: INavLinkProps) {
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
