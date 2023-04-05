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
  FaWhatsapp,
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
          <span className={styles.navItem}>
            <FaPhone className={styles.icon} /> {process.env.NEXT_PUBLIC_TEL}
          </span>
          <span>|</span>
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            className={styles.navItem}
          >
            <FaEnvelope className={styles.icon} />
            {process.env.NEXT_PUBLIC_EMAIL}
          </Link>
        </div>
        <div className={styles.right}>
          {process.env.NEXT_PUBLIC_FACEBOOK && (
            <Link
              href={process.env.NEXT_PUBLIC_FACEBOOK}
              className={styles.navItem}
            >
              <FaFacebook className={styles.icon} />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_INSTAGRAM && (
            <Link
              href={process.env.NEXT_PUBLIC_INSTAGRAM}
              className={styles.navItem}
            >
              <FaInstagram className={styles.icon} />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_LINKEDIN && (
            <Link
              href={process.env.NEXT_PUBLIC_LINKEDIN}
              className={styles.navItem}
            >
              <FaLinkedin className={styles.icon} />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_TWITTER && (
            <Link
              href={process.env.NEXT_PUBLIC_TWITTER}
              className={styles.navItem}
            >
              <FaTwitter className={styles.icon} />
            </Link>
          )}
          {process.env.NEXT_PUBLIC_WHATSAPP && (
            <Link
              href={process.env.NEXT_PUBLIC_WHATSAPP}
              className={styles.navItem}
            >
              <FaWhatsapp className={styles.icon} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
