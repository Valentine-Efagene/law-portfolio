import Image from "@/components/common/Image";
import Link from "next/link";
import { string } from "prop-types";
import React, { useState } from "react";
import NavLink from "../NavLink/NavLink";
import styles from "./DesktopNav.module.css";
import { Inter } from "next/font/google";
import { Rubik } from "next/font/google";

interface IDesktopNavProps {
  className?: string;
}

const rubik = Rubik({ subsets: ["latin"] });

export default function DesktopNav({ className }: IDesktopNavProps) {
  return (
    <div className={`${className} ${styles.container} ${rubik.className}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            alt=""
            height={43.5}
            src="https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Default-Logo.png"
          />
        </Link>
        <div className={styles.navItemsWrapper}>
          <NavLink href="/" className={styles.navButton}>
            Home
          </NavLink>
          <NavLink href="/blog" className={styles.navButton}>
            Blog
          </NavLink>
          <NavLink href="/users" className={styles.navButton}>
            Contacts
          </NavLink>
          <NavLink href="/profile" className={styles.navButton}>
            Profile
          </NavLink>
          <NavLink href="/about" className={styles.navButton}>
            About
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
