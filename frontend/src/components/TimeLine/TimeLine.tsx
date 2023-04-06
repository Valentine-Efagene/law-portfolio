import styles from "./TimeLine.module.css";
import React, { ReactNode } from "react";

import {
  //PT_Serif,
  Source_Sans_Pro,
  Rubik,
  Source_Serif_Pro,
} from "next/font/google";

const sourceSerifPro = Source_Serif_Pro({
  weight: "600",
  subsets: ["latin"],
  variable: "--playfair-display",
});

const sourceSansPro = Source_Sans_Pro({
  weight: "400",
  subsets: ["latin"],
  variable: "--source-sans-pro",
});

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
  variable: "--rubik",
});

interface ITimeLineEvent {
  date: string;
  title: string;
  description?: string;
  icon: ReactNode;
}

interface ITimeLineProps {
  timeline: ITimeLineEvent[];
  className?: string;
  style?: object;
}

function TimeLine({ timeline = [], className, style }: ITimeLineProps) {
  return (
    <div style={style} className={`${className} ${styles.container}`}>
      <div className={styles.line}></div>
      {timeline.map((timelineEvent) => {
        const { date, title, description, icon } = timelineEvent;

        return (
          <div key={title} className={styles.details}>
            <div className={styles.dot}>{icon}</div>
            <div className={styles.card}>
              <h3 className={sourceSerifPro.className}>{title}</h3>
              <h4>{date}</h4>
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeLine;
