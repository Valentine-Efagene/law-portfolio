// [slug].tsx

import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../../client";
import styles from "./post.module.css";
import { ICategory, IPost, ISanityImage } from "@/helpers/types";
import { GetStaticProps, GetStaticPropsContext } from "next";

import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";
import Image from "@/components/common/Image";
import SanityHelper from "@/helpers/SanityHelper";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import CommentForm from "@/components/forms/CommentForm/CommentForm";

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

interface IPostProps {
  post: {
    _id: string;
    title?: string;
    name?: string;
    categories: string[];
    authorImage: any;
    mainImage: any;
    body: any;
    _createdAt: string;
  };
}

const Post = ({ post }: IPostProps) => {
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    mainImage,
    body = [],
    _id,
    _createdAt: date,
  } = post;

  const defaultData = {
    _id,
    name: "",
    email: "",
    comment: "",
  };

  const [data, setData] = useState(defaultData);

  const handleChange: ChangeEventHandler = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmittingComment(true);
      const response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const {
        message,
        error: _err,
      }: {
        message: string;
        error: {
          statusCode: number;
        };
      } = await response.json();

      setError(_err ? message : undefined);

      setData((prevState) => (_err ? prevState : defaultData));
      setSubmitted(_err ? false : true);
    } catch (error) {
      const err = error as { message: string };
      setError(err.message);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
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
        <div className={styles.body}>
          <PortableText value={body} components={ptComponents} />
        </div>
      </article>
      {submitted ? (
        <div className={styles.commentFeedback}>
          <h2>Comment Submitted</h2>
          <p>
            Your comment is being reviewed, and will be displayed once approved
          </p>
        </div>
      ) : (
        <section className={styles.commentSection}>
          <h2>Comments</h2>
          <CommentForm
            isLoading={isSubmittingComment}
            error={error}
            data={data}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </section>
      )}
    </div>
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
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

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
export default Post;
