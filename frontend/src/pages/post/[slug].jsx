// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../../client";
import styles from "./post.module.css";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import Image from "@/components/common/Image";
import SanityHelper from "@/helpers/SanityHelper";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
        />
      );
    },
  },
};

const Post = ({ post }) => {
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    mainImage,
    body = [],
    _createdAt: date,
  } = post;
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={playfairDisplay.className}>{title}</h1>
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
        <div className={styles.authorNCat}>
          {authorImage && (
            <div className={styles.author}>
              <img
                className={styles.authorImage}
                src={urlFor(authorImage).width(50).url()}
                alt={`${name}'s picture`}
              />
              <div className={styles.dateNName}>
                {name && (
                  <div className={`${rubik.className} ${styles.authorName}`}>
                    {name}
                  </div>
                )}
                {date && (
                  <div className={sourceSansPro.className}>
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
          {categories && (
            <ul className={styles.categories}>
              {categories.map((category) => (
                <li className={styles.category} key={category}>
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <p className={styles.body}>
        <PortableText value={body} components={ptComponents} />
      </p>
    </article>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  body,
  _createdAt
}`;
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}
export default Post;
