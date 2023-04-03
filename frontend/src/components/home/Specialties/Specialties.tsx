import styles from "./Specialties.module.css";

import React from "react";
import { object, string } from "prop-types";
import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import useElementOnScreen from "@/hooks/useElementOnScreen";

interface ISpecialtiesProps {
  className?: string;
  style?: object;
}

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

const specialties = [
  {
    image: "/assets/img/Real-Estate-Construction-Law-Icon.png",
    title: "Financial Analysis",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image: "/assets/img/Personal-Injury-Law-Icon.png",
    title: "Long Experience",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image: "/assets/img/Insurance-Defence-Icon.png",
    title: "Our Success Cases",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image: "/assets/img/Insurance-Defence-Icon.png",
    title: "Financial Analysis",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image: "/assets/img/Insurance-Defence-Icon.png",
    title: "Long Experience",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image: "/assets/img/Insurance-Defence-Icon.png",
    title: "Our Success Cases",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
];

export default function Specialties({ className, style }: ISpecialtiesProps) {
  const [specialtiesRef, isVisible] = useElementOnScreen({
    threshold: 0.1,
  });

  return (
    <section style={style} className={`${className} ${styles.container}`}>
      <h2 className={`${styles.heading} ${playfairDisplay.className}`}>
        Something About LawCounsel
      </h2>
      <p className={`${sourceSansPro.className} ${styles.description}`}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.
      </p>
      <div
        ref={specialtiesRef}
        className={`${isVisible ? styles.animatedSpecialties : null} ${
          styles.specialties
        }`}
      >
        {specialties?.map((specialty) => {
          const { image, title, details } = specialty;

          return (
            <div key={title} className={styles.card}>
              <img src={image} alt="" />
              <h3 className={`${playfairDisplay.className}`}>{title}</h3>
              <p className={`${sourceSansPro.className}`}>{details}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
