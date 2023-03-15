import React from "react";
import styles from "./Footer.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import { string } from "prop-types";
import Link from "next/link";
import Image from "@/components/common/Image";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

Footer.propTypes = {
  className: string,
};

export default function Footer({ className }) {
  return (
    <footer className={`${className} ${styles.container}`}>
      <div className={styles.grid}>
        <div className={styles.about}>
          <h3 className={`${playfairDisplay.className}`}>About Us</h3>
          <p>
            We’re on a mission to build a better future where justice creates
            good jobs for everyone.
          </p>
          <Link href="/" className={styles.logo}>
            <Image
              alt=""
              height={43.5}
              src="https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Default-Logo.png"
            />
          </Link>
        </div>
        <div className={styles.links}>
          <h3 className={`${playfairDisplay.className}`}>Important Links</h3>
          <nav className={`${sourceSansPro.className}`}>
            <a href="">Home</a>
            <a href="">About Us</a>
            <a href="">Attorneys</a>
            <a href="">Careers</a>
            <a href="">Blog</a>
            <a href="">Shop</a>
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
          LawCounsel - 2018
        </p>
      </div>
    </footer>
  );
}
