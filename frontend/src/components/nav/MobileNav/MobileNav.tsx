"use client";

import React, { useState } from "react";
import styles from "./MobileNav.module.css";
import Link from "next/link";
import Image from "@/components/common/Image";
import { FaBars, FaTimes } from "react-icons/fa";

interface IMobileNavProps {
  className?: string;
}

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import Logo from "../Logo";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

export default function MobileNav({ className }: IMobileNavProps) {
  const [showMenu, setShowMenu] = useState(false);

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
        <a className={styles.navItem} href="">
          Home
        </a>
        <a className={styles.navItem} href="/blog">
          Blog
        </a>
        <a className={styles.navItem} href="">
          About
        </a>
        <a className={styles.navItem} href="">
          Services
        </a>
        <a className={styles.navItem} href="/history">
          History
        </a>
      </div>
    </nav>
  );
}
