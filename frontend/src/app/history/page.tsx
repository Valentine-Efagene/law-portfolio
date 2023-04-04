import React from "react";
import styles from "./History.module.css";
import {
  FaGraduationCap,
  FaAward,
  FaRegistered,
  FaCertificate,
} from "react-icons/fa";
import TimeLine from "../../components/TimeLine";
import Layout from "@/components/Layout";
import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";

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

const playfairDisplay = Playfair_Display({
  weight: "600",
  subsets: ["latin"],
  variable: "--playfair-display",
});

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

export const metadata = {
  title: "History",
  description: "Professional history",
};

function History() {
  return (
    <Layout>
      <div className={`${rubik.className} ${styles.container}`}>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1 className={playfairDisplay.className}>History</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
              error explicabo modi quasi quidem, nostrum assumenda reiciendis,
              dolorum tempora excepturi dignissimos aut.
            </p>
          </div>
        </header>
        <h2 className={`${sourceSansPro.className} ${styles.h2}`}>Timeline</h2>
        <TimeLine
          className={`${sourceSansPro.variable} ${rubik.variable}  ${playfairDisplay.variable} ${styles.timeline}`}
          timeline={TIMELINE}
        />
      </div>
    </Layout>
  );
}

export default History;
