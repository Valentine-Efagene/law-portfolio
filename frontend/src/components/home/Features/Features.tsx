import React, { useEffect, useState } from "react";
import styles from "./Features.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import { string } from "prop-types";
import useElementOnScreen from "@/hooks/useElementOnScreen";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

interface IFeaturesProps {
  className?: string;
}

const features = [
  {
    image:
      "https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Financial-Analysis-Icon.png?id=8184",
    title: "Financial Analysis",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image:
      "https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Long-Experience-Icon.png",
    title: "Long Experience",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
  {
    image:
      "https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Our-Success-Cases-Icon.png",
    title: "Our Success Cases",
    details:
      "On the other hand we denounce with righteous indignation and dislike men.",
  },
];

export default function Features({ className }: IFeaturesProps) {
  const [featureRef, isFeatureVisible] = useElementOnScreen({ threshold: 0.3 });

  return (
    <section className={`${className} ${styles.container}`}>
      <h2 className={`${styles.heading} ${playfairDisplay.className}`}>
        Something About LawCounsel
      </h2>
      <p className={`${sourceSansPro.className} ${styles.description}`}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.
      </p>
      <div
        ref={featureRef}
        className={`${isFeatureVisible ? styles.animatedFeatures : null} ${
          styles.features
        }`}
      >
        {features?.map((feature) => {
          const { image, title, details } = feature;

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