import React from "react";
import groq from "groq";
import styles from "./Blog.module.css";
import client from "../../../client";
import { IPost } from "@/helpers/types";
import Link from "next/link";
import Image from "@/components/common/Image";
import SanityHelper from "@/helpers/SanityHelper";
import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import FilterNSort from "@/components/FilterNSort";
import Layout from "@/components/Layout";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

const query = groq`*[_type == "post"] | order(_createdAt desc) {
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

const allAuthorsQuery = groq`*[_type == "author"] | order(name) {
  _id,
  name
}`;

const allCatsQuery = groq`*[_type == "category"] | order(title) {
  _id,
  title
}`;

export const metadata = {
  title: "Blog",
  description: "A list of blog posts",
};

export default async function Blog() {
  const posts: IPost[] = await client.fetch(query);
  const authors: { name: string; _id: string }[] = await client.fetch(
    allAuthorsQuery
  );
  const categories: { title: string; _id: string }[] = await client.fetch(
    allCatsQuery
  );

  // For test
  //const demoPosts = Array(5).fill(posts[0]);

  return (
    <Layout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1 className={playfairDisplay.className}>Suit Blog</h1>
            <p className={sourceSansPro.className}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
              error explicabo modi quasi quidem, nostrum assumenda reiciendis,
              dolorum tempora excepturi dignissimos aut.
            </p>
          </div>
        </header>
        <main>
          <h2 className={`${styles.h2} ${sourceSansPro.className}`}>Latest</h2>
          <FilterNSort
            className={styles.filterNSort}
            authors={authors}
            categories={categories}
          />
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
                <Link
                  href={`/post/${current}`}
                  className={styles.card}
                  key={_id}
                >
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
                      <span
                        className={`${sourceSansPro.className} ${styles.name}`}
                      >
                        {authorName}
                      </span>
                      <span
                        className={`${sourceSansPro.className} ${styles.date}`}
                      >
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
        </main>
      </div>
    </Layout>
  );
}
