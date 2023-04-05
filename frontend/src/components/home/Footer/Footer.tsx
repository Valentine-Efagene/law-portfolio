import React from "react";
import styles from "./Footer.module.css";

import Link from "next/link";
import {
  Source_Sans_Pro,
  //Playfair_Display,
  //Rubik
} from "next/font/google";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Logo from "@/components/nav/Logo";

//const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
//const rubik = Rubik({ weight: "500", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });

interface IFooterProps {
  className?: string;
}

export default function Footer({ className }: IFooterProps) {
  return (
    <footer
      className={`${className} ${styles.container} ${sourceSansPro.className}`}
    >
      <div className={styles.grid}>
        <div className={styles.about}>
          <h3 className={`${sourceSansPro.className}`}>About Us</h3>
          <p>
            We’re on a mission to build a better future where justice creates
            good jobs for everyone.
          </p>
          <Logo className={styles.logo} />
          <div className={styles.socials}>
            {process.env.NEXT_PUBLIC_FACEBOOK && (
              <Link href={process.env.NEXT_PUBLIC_FACEBOOK}>
                <FaFacebook className={styles.icon} />
              </Link>
            )}
            {process.env.NEXT_PUBLIC_INSTAGRAM && (
              <Link href={process.env.NEXT_PUBLIC_INSTAGRAM}>
                <FaInstagram className={styles.icon} />
              </Link>
            )}
            {process.env.NEXT_PUBLIC_WHATSAPP && (
              <Link href={process.env.NEXT_PUBLIC_WHATSAPP}>
                <FaWhatsapp className={styles.icon} />
              </Link>
            )}
            {process.env.NEXT_PUBLIC_LINKEDIN && (
              <Link href={process.env.NEXT_PUBLIC_LINKEDIN}>
                <FaLinkedin className={styles.icon} />
              </Link>
            )}
            {process.env.NEXT_PUBLIC_TWITTER && (
              <Link href={process.env.NEXT_PUBLIC_TWITTER}>
                <FaTwitter className={styles.icon} />
              </Link>
            )}
          </div>
        </div>
        <div className={styles.links}>
          <h3 className={`${sourceSansPro.className}`}>Important Links</h3>
          <nav className={`${sourceSansPro.className}`}>
            <Link href="">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/history">History</Link>
            <Link href="">About Us</Link>
            <Link href="">Attorneys</Link>
          </nav>
        </div>
        <div className={styles.services}>
          <h3 className={`${sourceSansPro.className}`}>Featured Services</h3>
          <nav className={`${sourceSansPro.className}`}>
            <Link href="">Business Law</Link>
            <Link href="">Education Law</Link>
            <Link href="">Family Law</Link>
            <Link href="">Real Estate Construction Law</Link>
            <Link href="">Personal Injury Law</Link>
            <Link href="">Insurance Defence</Link>
          </nav>
        </div>
        <div className={styles.contact}>
          <h3 className={`${sourceSansPro.className}`}>Contact Us</h3>
          <div>Office Address</div>
          <div>PO Box 16122 Collins Street West</div>
          <div>Victoria 8007 Australia</div>
          <br />
          <div>Phone: {process.env.NEXT_PUBLIC_TEL}</div>
          <br />
          <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            Email: {process.env.NEXT_PUBLIC_EMAIL}
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={`${sourceSansPro.className} ${styles.license}`}>
          LawCounsel - © {process.env.NEXT_PUBLIC_LICENSE_YEAR}
        </p>
      </div>
    </footer>
  );
}
