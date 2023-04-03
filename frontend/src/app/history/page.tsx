import React from "react";
import styles from "./History.module.css";
import {
  FaGraduationCap,
  FaAward,
  FaRegistered,
  FaCertificate,
} from "react-icons/fa";
import TimeLine from "../../components/TimeLine";
import { Playfair_Display, Rubik } from "next/font/google";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ subsets: ["latin"] });

const TIMELINE = [
  {
    date: "30-02-1997",
    title: "Bachelors in Law",
    description:
      "Voluptate quidem, distinctio quas, iusto quam consectetur debitis exercitationem alias autem dolore totam? Consequuntur, esse illum libero nobis quia error?",
    icon: <FaGraduationCap />,
  },
  {
    date: "30-02-2000",
    title: "Bar Exam",
    description:
      "Voluptate quidem, distinctio quas, iusto quam consectetur debitis exercitationem alias autem dolore totam? Consequuntur, esse illum libero nobis quia error?",
    icon: <FaCertificate />,
  },
  {
    date: "30-02-2002",
    title: "Win Human Rights Award",
    description:
      "Voluptate quidem, distinctio quas, iusto quam consectetur debitis exercitationem alias autem dolore totam? Consequuntur, esse illum libero nobis quia error?",
    icon: <FaAward />,
  },
  {
    date: "30-02-2002",
    title: "Register Practice",
    description:
      "Voluptate quidem, distinctio quas, iusto quam consectetur debitis exercitationem alias autem dolore totam? Consequuntur, esse illum libero nobis quia error?",
    icon: <FaRegistered />,
  },
];

function History() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>History</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            error explicabo modi quasi quidem, nostrum assumenda reiciendis,
            dolorum tempora excepturi dignissimos aut.
          </p>
        </div>
      </header>
      <h2 className={`${playfairDisplay.className} ${styles.h2}`}>Timeline</h2>
      <TimeLine
        className={`${rubik.className} ${styles.timeline}`}
        timeline={TIMELINE}
      />
    </div>
  );
}

export default History;
