import React from "react";
import groq from "groq";
import styles from "./Blog.module.css";
import client from "../../../client";
import { IPost } from "@/helpers/types";
import Link from "next/link";
import Image from "@/components/common/Image";
import SanityHelper from "@/helpers/SanityHelper";
import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

const query = groq`*[_type == "post"]{
  _id,
  title,
  author -> {
      name,
      image
  },
  description,
  mainImage,
  slug,
  _createdAt
}`;

export default async function Blog() {
  const posts: IPost[] = await client.fetch(query);
  const searchMap = {
    author: "Authors",
  };

  // For test
  //const demoPosts = Array(5).fill(posts[0]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>Suit Blog</h1>
          <p className={sourceSansPro.className}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
            error explicabo modi quasi quidem, nostrum assumenda reiciendis,
            dolorum tempora excepturi dignissimos aut.
          </p>
        </div>
      </header>
      <h2 className={`${styles.h2} ${sourceSansPro.className}`}>Latest</h2>
      <div className={styles.posts}>
        {posts?.map((post) => {
          const {
            _id,
            slug: { current },
            mainImage,
            author: { name: authorName, image: authorImage } = {},
            description,
            title,
            _createdAt,
          } = post;

          return (
            <Link href={`/post/${current}`} className={styles.card} key={_id}>
              {mainImage && (
                <div className={styles.mainImageWrapper}>
                  <Image
                    fill
                    className={styles.mainImage}
                    alt=""
                    src={SanityHelper.urlFor(mainImage)
                      .fit("max")
                      .auto("format")
                      .url()}
                  />
                </div>
              )}
              <div className={styles.details}>
                <h3 className={rubik.className}>{title}</h3>
                {description && <p>{description}</p>}
                <div className={styles.bottom}>
                  {authorImage && (
                    <Image
                      className={styles.authorImage}
                      alt=""
                      width={32}
                      height={32}
                      src={SanityHelper.urlFor(authorImage)
                        .width(32)
                        .height(32)
                        .fit("max")
                        .auto("format")
                        .url()}
                    />
                  )}
                  <span className={`${sourceSansPro.className} ${styles.name}`}>
                    {authorName}
                  </span>
                  <span className={`${sourceSansPro.className} ${styles.date}`}>
                    {new Date(_createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
