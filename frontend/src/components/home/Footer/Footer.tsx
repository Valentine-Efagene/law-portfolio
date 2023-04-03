import React from "react";
import styles from "./Footer.module.css";

import { string } from "prop-types";
import Link from "next/link";
import Image from "@/components/common/Image";
import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import { FaFacebook, FaGoogle, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "@/components/nav/Logo";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

interface IFooterProps {
  className?: string;
}

export default function Footer({ className }: IFooterProps) {
  return (
    <footer className={`${className} ${styles.container}`}>
      <div className={styles.grid}>
        <div className={styles.about}>
          <h3 className={`${playfairDisplay.className}`}>About Us</h3>
          <p>
            We’re on a mission to build a better future where justice creates
            good jobs for everyone.
          </p>
          <Logo className={styles.logo} />
          <div className={styles.socials}>
            <a href="">
              <FaFacebook className={styles.icon} />
            </a>
            <a href="">
              <FaInstagram className={styles.icon} />
            </a>
            <a href="">
              <FaWhatsapp className={styles.icon} />
            </a>
            <a href="">
              <FaGoogle className={styles.icon} />
            </a>
          </div>
        </div>
        <div className={styles.links}>
          <h3 className={`${playfairDisplay.className}`}>Important Links</h3>
          <nav className={`${sourceSansPro.className}`}>
            <a href="">Home</a>
            <a href="/blog">Blog</a>
            <a href="/history">History</a>
            <a href="">About Us</a>
            <a href="">Attorneys</a>
          </nav>
        </div>
        <div className={styles.services}>
          <h3 className={`${playfairDisplay.className}`}>Featured Services</h3>
          <nav className={`${sourceSansPro.className}`}>
            <a href="">Business Law</a>
            <a href="">Education Law</a>
            <a href="">Family Law</a>
            <a href="">Real Estate Construction Law</a>
            <a href="">Personal Injury Law</a>
            <a href="">Insurance Defence</a>
          </nav>
        </div>
        <div className={styles.contact}>
          <h3 className={`${playfairDisplay.className}`}>Contact Us</h3>
          <div>Office Address</div>
          <div>PO Box 16122 Collins Street West</div>
          <div>Victoria 8007 Australia</div>
          <br />
          <div>Phone: 888 123-4587</div>
          <br />
          <div>Email: info@example.com</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={`${sourceSansPro.className} ${styles.license}`}>
          LawCounsel - © 2018
        </p>
      </div>
    </footer>
  );
}
