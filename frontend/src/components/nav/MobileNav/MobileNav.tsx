"use client";

import React, { useState } from "react";
import styles from "./MobileNav.module.css";
import { FaBars, FaBlog, FaHome, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { GrAchievement } from "react-icons/gr";

interface IMobileNavProps {
  className?: string;
}

import { Source_Sans_Pro } from "next/font/google";
import Logo from "../Logo";
import Link from "next/link";

const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });

const MobileNav = ({ className }: IMobileNavProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={`${className} ${styles.container}`}>
      <Logo className={styles.logo} alt="" href="/" />
      <button className={styles.toggle} onClick={openMenu}>
        <FaBars className={styles.icon} />
      </button>
      <div
        className={`${showMenu ? styles.open : null} ${styles.menu} ${
          sourceSansPro.className
        }`}
      >
        <button className={styles.close} onClick={closeMenu}>
          <FaTimes className={styles.icon} />
        </button>
        <Link
          className={`${pathname === "/" ? styles.active : ""} ${
            styles.navItem
          }`}
          href="/"
        >
          <FaHome className={styles.icon} />
          Home
        </Link>
        <Link
          className={`${pathname === "/blog" ? styles.active : ""} ${
            styles.navItem
          }`}
          href="/blog"
        >
          <FaBlog className={styles.icon} />
          Blog
        </Link>
        <Link
          className={`${pathname === "/history" ? styles.active : ""} ${
            styles.navItem
          }`}
          href="/history"
        >
          <GrAchievement className={styles.icon} />
          History
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
