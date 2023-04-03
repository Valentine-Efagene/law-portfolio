import React from "react";
import styles from "./Hero.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

interface IHeroProps {
  className?: string;
}

export default function Hero({ className }: IHeroProps) {
  return (
    <section className={`${className} ${styles.container}`}>
      <h1 className={`${playfairDisplay.className} ${styles.headline}`}>
        Really Unbelievable Solutions for & all Legal Cases.
      </h1>
      <p className={`${sourceSansPro.className} ${styles.subHeadline}`}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna…
      </p>
      <button className={`${rubik.className} ${styles.cta}`}>
        ASK FOR CONSULTATION
      </button>
    </section>
  );
}
