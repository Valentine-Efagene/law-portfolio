"use client";

import React, { ReactNode } from "react";
import styles from "./NavLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLinkProps {
  className?: string;
  isActive?: boolean;
  children?: ReactNode;
  href: string;
}

export default function NavLink({ href, className, children }: INavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${pathname === href ? styles.active : null} ${className} ${
        styles.container
      }`}
    >
      {children}
      <hr />
    </Link>
  );
}
