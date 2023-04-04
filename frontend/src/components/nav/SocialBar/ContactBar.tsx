import Link from "next/link";
import styles from "./ContactBar.module.css";
import { Rubik } from "next/font/google";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

interface IContactBarProps {
  className?: string;
}

const rubik = Rubik({ subsets: ["latin"] });

export default function ContactBar({ className }: IContactBarProps) {
  return (
    <nav className={`${className} ${styles.container} ${rubik.className}`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link href="/" className={styles.navItem}>
            <FaPhone className={styles.icon} /> {process.env.NEXT_PUBLIC_TEL}
          </Link>
          <span>|</span>
          <Link href="/blog" className={styles.navItem}>
            <FaEnvelope className={styles.icon} />
            {process.env.NEXT_PUBLIC_EMAIL}
          </Link>
        </div>
        <div className={styles.right}>
          <Link href="/" className={styles.navItem}>
            <FaFacebook className={styles.icon} />
          </Link>
          <Link href="/blog" className={styles.navItem}>
            <FaInstagram className={styles.icon} />
          </Link>
          <Link href="/history" className={styles.navItem}>
            <FaLinkedin className={styles.icon} />
          </Link>
          <Link href="/history" className={styles.navItem}>
            <FaTwitter className={styles.icon} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
