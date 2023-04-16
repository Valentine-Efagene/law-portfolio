// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../../../client";
import styles from "./post.module.css";
import { IPost } from "@/helpers/types";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import Image from "@/components/common/Image";
import SanityHelper from "@/helpers/SanityHelper";
import CommentForm from "@/components/forms/CommentForm/CommentForm";
import Comments from "@/components/listings/Comments";
import Layout from "@/components/Layout";
import Link from "next/link";
import SharePanel from "@/components/SharePanel";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source);
}

export const revalidate = 240;

const ptComponents = {
  types: {
    // If value is null, check that the image was not partially uploaded
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className={styles.bodyFigure}>
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
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "name": author->name,
  categories[]->,
  "authorImage": author->image,
  mainImage,
  body,
  _createdAt,
  publishedAt,
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
  searchParams: {
    authors?: string;
    categories?: string;
    dateOrder?: string;
    titleOrder?: string;
  };
}

export async function generateMetadata({ params }: IPostProps) {
  const { slug = "" } = params;
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
    publishedAt: date,
  } = post;

  return (
    <Layout>
      <div className={styles.container}>
        <article>
          <h1 className={playfairDisplay.className}>{title}</h1>
          <header className={styles.header}>
            <figure>
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
              {mainImage?.caption && (
                <figcaption className={styles.mainImageCaption}>
                  {mainImage?.caption}
                </figcaption>
              )}
            </figure>
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
                      <Link
                        key={category._id}
                        href={{
                          pathname: "../blog",
                          query: {
                            category: category.slug.current,
                          },
                        }}
                      >
                        <li className={styles.category}>{category.title}</li>
                      </Link>
                    ))}
                </ul>
              )}
            </div>
          </header>
          <div className={styles.bodyNShare}>
            <SharePanel title={title} url={`/`} className={styles.sharePanel} />
            <div className={styles.body}>
              <PortableText value={body} components={ptComponents} />
            </div>
          </div>
          <CommentForm _id={_id} />
        </article>
        <div className={styles.comments}>
          <h2 className={rubik.className}>Comments</h2>
          <Comments comments={comments} />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
