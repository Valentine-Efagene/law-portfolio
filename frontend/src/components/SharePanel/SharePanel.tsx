"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaFacebook,
  FaLinkedin,
  FaShareAlt,
  FaSpinner,
  FaTwitter,
} from "react-icons/fa";
import styles from "./SharePanel.module.css";

function SharePanel({
  className,
  title,
  url,
}: {
  className?: string;
  title: string;
  url: string;
}) {
  const [shared, setShared] = useState(false);
  const [sharing, setSharing] = useState(false);

  const shareData = {
    title,
    url,
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      setShared(false);
      await navigator?.share(shareData);
      setShared(true);
    } catch (error) {
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className={`${className} ${styles.container}`}>
      <button onClick={handleShare} className={styles.share}>
        <FaShareAlt className={styles.icon} /> <span>Share</span>
      </button>
      <Link className={styles.link} href="">
        <FaLinkedin className={styles.icon} />
      </Link>
      <Link href="" className={styles.link}>
        <FaTwitter className={styles.icon} />
      </Link>
      <Link href="" className={styles.link}>
        <FaFacebook className={styles.icon} />
      </Link>
      {shared && <FaCheckCircle className={styles.status} />}
      {sharing && <FaSpinner className={`fa-pulse ${styles.status}`} />}
    </div>
  );
}

export default SharePanel;
