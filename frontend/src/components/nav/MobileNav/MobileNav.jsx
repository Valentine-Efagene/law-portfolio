import { string } from "prop-types";
import React, { useState } from "react";
import NavLink from "../NavLink/NavLink";
import styles from "./MobileNav.module.css";
import Link from "next/link";
import Image from "@/components/common/Image";
import { FaBars, FaTimes } from "react-icons/fa";

MobileNav.propTypes = {
  className: string,
};

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

export default function MobileNav({ className }) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={`${className} ${styles.container}`}>
      <Link href="/" className={styles.logo}>
        <Image
          alt=""
          height={43.5}
          src="https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Default-Logo.png"
        />
      </Link>
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
        <a className={styles.navItem} href="http://localhost:3333/">
          Blog
        </a>
        <a className={styles.navItem} href="">
          About
        </a>
        <a className={styles.navItem} href="">
          Services
        </a>
        <a className={styles.navItem} href="">
          Contact
        </a>
      </div>
    </nav>
  );
}
