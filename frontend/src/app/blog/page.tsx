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
import Paginator from "@/components/common/Paginator";

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"] });
const sourceSansPro = Source_Sans_Pro({ weight: "400", subsets: ["latin"] });
const rubik = Rubik({ weight: "500", subsets: ["latin"] });

const LIMIT = 10;

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

export const revalidate = 240;
interface IBlogProps {
  params: {
    slug?: string;
  };
  searchParams: {
    author?: string;
    category?: string;
    dateOrder?: string;
    titleOrder?: string;
    page?: number;
  };
}

async function fetchPaginatedPost(
  author?: string | null,
  category?: string | null,
  page: number = 1,
  limit: number = 10
) {
  const { constraint: authorCatConstraint, variables } =
    generateAuthorCatContraint(author, category);

  const posts = await client.fetch(
    groq`*[_type == "post" ${authorCatConstraint}] | order(publishedAt desc) [${
      (page - 1) * limit
    }...${(page - 1) * limit + limit}] {
      _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug,
      _createdAt,
      publishedAt
    }`,
    variables
  );

  return posts;
}

function generateAuthorCatContraint(
  author?: string | null,
  category?: string | null
): {
  constraint: string;
  variables: { [key: string]: string | number | boolean };
} {
  const constraint = "";
  const variables: { [key: string]: string | number } = {};

  if (author) {
    constraint.concat(" && references($author) ");
    variables["author"] = author;
  }

  if (category) {
    constraint.concat(" && references($category) ");
    variables["category"] = category;
  }

  return { constraint, variables };
}

async function fetchTotal(author?: string | null, category?: string | null) {
  const { constraint, variables } = generateAuthorCatContraint(
    author,
    category
  );

  const total = await client.fetch(
    groq`count(*[_type == "post" ${constraint}])`,
    variables
  );

  return total;
}

export default async function Blog({ params, searchParams }: IBlogProps) {
  let lastId: string | null = "";
  let lastPublishedAt: string | null = "";

  /*async function fetchNextPage(
    author?: string | null,
    category?: string | null
  ) {
    if (lastId === null) {
      return [];
    }

    const authorCatConstraint = "";
    let paginationContraint = "";
    const variables: { [key: string]: string | number } = {};

    if (author) {
      authorCatConstraint.concat(" && references($author) ");
      variables["author"] = author;
    }

    if (category) {
      authorCatConstraint.concat(" && references($category) ");
      variables["category"] = category;
    }

    if (lastPublishedAt && lastId == null) {
      variables["lastPublishedAt"] = lastPublishedAt;
      paginationContraint = " && publishedAt > $lastPublishedAt ";
    } else if (lastPublishedAt && lastId) {
      variables["lastPublishedAt"] = lastPublishedAt;
      variables["lastId"] = lastId;
      paginationContraint = ` && (
        publishedAt > $lastPublishedAt
        || (publishedAt == $lastPublishedAt && _id > $lastId)
      ) `;
    }

    const posts = await client.fetch(
      groq`*[_type == "post" ${authorCatConstraint} ${paginationContraint}] | order(publishedAt desc) [0...100] {
        _id,
        title,
        author -> {
          name,
          image
        },
        description,
        mainImage,
        slug,
        _createdAt,
        publishedAt
      }`,
      variables
    );

    if (posts.length > 0) {
      lastPublishedAt = posts[posts.length - 1].publishedAt;
      lastId = posts[posts.length - 1]._id;
    } else {
      lastId = null; // Reached the end
    }
    return posts;
  }*/

  const { author, category, page = 1 } = searchParams;

  const postsPromise: Promise<IPost[]> = fetchPaginatedPost(author, category);
  const authorsPromise: Promise<{ name: string; _id: string }[]> =
    client.fetch(allAuthorsQuery);
  const categoriesPromise: Promise<{ title: string; _id: string }[]> =
    client.fetch(allCatsQuery);
  const totalPromise: Promise<number> = fetchTotal();

  // For test
  //const posts = Array(5).fill(posts[0]);
  const [posts, authors, categories, total] = await Promise.all([
    postsPromise,
    authorsPromise,
    categoriesPromise,
    totalPromise,
  ]);

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
              {/* {JSON.stringify(searchParams)} */}
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
                publishedAt,
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
                        {new Date(publishedAt).toLocaleDateString("en-US", {
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
          <Paginator
            total={total}
            currentPage={page}
            queryParams={{ author, category }}
            limit={LIMIT}
          />
        </main>
      </div>
    </Layout>
  );
}
