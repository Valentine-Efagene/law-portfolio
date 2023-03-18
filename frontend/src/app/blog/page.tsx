import React from "react";
import groq from "groq";
import styles from "./Blog.module.css";
import client from "../../../client";
import { IPost } from "@/helpers/types";
import Link from "next/link";

interface IBlogProps {
  posts?: IPost[];
}

export default function Blog({ posts }: IBlogProps) {
  console.log({ posts });

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map((post) => {
          const {
            _id,
            slug,
            author: { name, image },
            description,
            title,
          } = post;

          return (
            <Link href={`/${slug}`} className={styles.card} key={_id}>
              <h3>{title}</h3>
              <p>{description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const query = groq`*[_type == "post"]{
    _id,
    title,
    author -> {
        name,
        image
    },
    description,
    mainImage,
    slug
}`;

export async function getStaticProps() {
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
}
