import styles from "./TimeLine.module.css";
import React, { ReactNode } from "react";

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
      {timeline.map((timelineEvent, index) => {
        const { date, title, description, icon } = timelineEvent;

        return (
          <div key={title} className={styles.details}>
            <div className={styles.dot}>{icon}</div>
            <div className={styles.card}>
              <h3>{title}</h3>
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
