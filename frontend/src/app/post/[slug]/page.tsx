// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../../../client";
import styles from "./post.module.css";
import { ICategory, IComment, IPost, ISanityImage } from "@/helpers/types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { Metadata } from "next";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import Image from "@/components/common/Image";
import SanityHelper from "@/helpers/SanityHelper";
import CommentForm from "@/components/forms/CommentForm/CommentForm";
import Comments from "@/components/listings/Comments";
import Footer from "@/components/home/Footer";
import Layout from "@/components/Layout";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    // If value is null, check that the image was not partially uploaded
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <img
          className={styles.bodyImage}
          alt={value.alt || " "}
          loading="lazy"
          src={
            urlFor(value)
              //.width(320).height(240)
              .fit("max")
              .auto("format")
              .toString() // Trying out because of typing for img
          }
        />
      );
    },
  },
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  body,
  _createdAt,
  "comments": *[
    _type == "comment" && 
    post._ref == ^._id &&
    approved == true
  ]
}`;

interface IPostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug = "" } }: IPostProps) {
  const titleQuery = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
  }.title`;

  const title = await client.fetch(titleQuery, { slug });

  return {
    title,
  };
}

const Post = async ({ params: { slug = "" } }: IPostProps) => {
  const post: IPost = await client.fetch(query, { slug });

  if (post == null) {
    return <>404</>;
  }

  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    comments,
    mainImage,
    body = [],
    _id,
    _createdAt: date,
  } = post;

  return (
    <Layout>
      <div className={styles.container}>
        <article>
          <h1 className={playfairDisplay.className}>{title}</h1>
          <header className={styles.header}>
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
                      <div
                        className={`${rubik.className} ${styles.authorName}`}
                      >
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
                  {categories &&
                    categories.map((category) => (
                      <li className={styles.category} key={category}>
                        {category}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </header>
          <div className={styles.body}>
            <PortableText value={body} components={ptComponents} />
          </div>
        </article>
        <CommentForm _id={_id} />
        <div className={styles.comments}>
          <h2 className={rubik.className}>Comments</h2>
          <Comments comments={comments} />
        </div>
        <Footer className={styles.footer} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

/*
export const getStaticProps = async (context: any) => {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post: IPost = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
*/
export default Post;
