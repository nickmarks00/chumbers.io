import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import { MDXRemote } from "next-mdx-remote";

import {
  BsFillCalendarFill,
  BsClock,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";
import { FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";

import { getPostPaths, getSinglePost } from "../../services/getPosts";
import { getHeadings } from "../../services/getHeadings";
import components from "../../styles/components";

import TableOfContents from "../../components/TableOfContents";
import { mdxSerializer } from "../../services/mdxSerializer";
import NotFoundPage from "../404";
import Error from "next/error";

const Content = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <Error statusCode={404} />;
  }

  const {
    title,
    heroImage,
    category,
    updatedAt,
    publishedAt,
    tags,
    prevPost,
    nextPost,
    course,
    headings,
  } = post;

  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="h-96">
        <div className="w-full h-full relative">
          <Image
            src={heroImage.url}
            alt={heroImage.alternate ? heroImage.alternate : "post hero-image"}
            priority={true}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <main className="bg-white px-10 py-10">
        <header className="text-center flex flex-col justify-items-center items-center post-header">
          <aside className="flex justify-center w-full whitespace-pre text-gray-400 ">
            <Link href="/">
              <a className="transition transform duration-300 hover:text-gray-200 hover:underline">{`Home`}</a>
            </Link>
            <p>{`   /   `}</p>
            <Link href={`/categories/${category.slug}`}>
              <a className="transition transform duration-300 hover:text-gray-200 hover:underline">{`${category.name}`}</a>
            </Link>
            <p>{`   /`}</p>
          </aside>
          <h1 className="text-5xl font-display capitalize">{title}</h1>

          <section className="flex flex-col items-center text-xs w-3/5 mx-auto items-center">
            <div className="flex flex-col sm:flex-row my-2">
              <article className="flex py-1 mt-1">
                <BsFillCalendarFill className="mr-1" />
                <p className="mr-2">
                  {`Updated: ${moment(updatedAt).format("MMM DD, YYYY")}`}
                </p>
                <BsFillCalendarFill className="mr-1" />
                <p className="mr-2">
                  {`Published: ${moment(publishedAt).format("MMM DD, YYYY")}`}
                </p>
              </article>
              <article className="flex py-1 mt-1">
                <BsClock className="mr-1" />
                <p>3 min. read</p>
              </article>
            </div>
            {course && (
              <Link href={`/courses/${courseSlug}`}>
                <a className="mb-6 rounded-md bg-blue-500 transition-200 hover:text-white p-2 text-bold text-md">
                  {course.courseTitle}
                </a>
              </Link>
            )}
            <article className="flex flex-wrap w-3/5 justify-center">
              {tags.length > 0 &&
                tags.map((tag, idx) => {
                  return (
                    <Link href={`/tags/${tag.slug}`} key={idx}>
                      <a className="p-1 mr-1 mt-1 rounded-md bg-teal transition  duration-300 hover:text-white  min-w-max">
                        {`#${tag.name}`}
                      </a>
                    </Link>
                  );
                })}
            </article>
          </section>
        </header>

        <section
          className="rich-text text-left xl:mx-auto md:mx-28 xs:mx-3 text-off-black"
          style={{ maxWidth: 740 }}
        >
          <div className="w-full flex flex-col ">
            {headings.length > 0 && <TableOfContents headings={headings} />}
            <MDXRemote {...post.mdx} components={components} />
          </div>
        </section>

        {course && (
          <section
            className={`justify-between items-end flex my-16 text-sm text-gray-600 xl:mx-auto md:mx-28 xs:mx-3 ${
              !prevPost && "flex-row-reverse"
            }`}
            style={{ maxWidth: 740 }}
          >
            {prevPost && (
              <Link href={`/content/${prevPost.slug}`}>
                <a className=" w-48 flex flex-col items-start text-left transition transform duration-200 hover:text-teal ">
                  <p>{prevPost.title}</p>
                  <BsArrowLeft className="w-8 h-8 mt-1" />
                </a>
              </Link>
            )}
            {nextPost && (
              <Link href={`/content/${nextPost.slug}`}>
                <a className=" w-48 flex flex-col items-end text-right transition transform duration-200 hover:text-teal ">
                  <p>{nextPost.title}</p>
                  <BsArrowRight className="w-8 h-8 mt-1" />
                </a>
              </Link>
            )}
            {!nextPost && !course.isCompleted && (
              <a
                className=" w-48 flex flex-col items-end text-right text-gray-400 "
                disabled
              >
                <p>More coming soon...</p>
                <BsArrowRight className="w-8 h-8 mt-1" />
              </a>
            )}
          </section>
        )}

        <section>
          <div className="flex items-center">
            <span className="mr-2 min-w-max text-gray-400">Share </span>
            <hr className="w-full" />
          </div>
          <div className="w-full flex justify-center my-8">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?url=${url}&text=${title}&via=nickmarks00`}
            >
              <FiTwitter className="h-10 w-10 text-gray-400" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://facebook.com/sharer.php?u=${url}`}
            >
              <FiFacebook className="h-10 w-10 text-gray-400 mx-9" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin className="h-10 w-10 text-gray-400" />
            </a>
          </div>
          <hr className="w-full" />
        </section>
      </main>
    </>
  );
};

export default Content;

export async function getStaticProps({ params }) {
  const post = await getSinglePost(params.slug);

  const headings = getHeadings(post.content.html);

  const mdx = await mdxSerializer(post.content.markdown);

  return {
    props: {
      post: {
        mdx,
        headings,
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPostPaths();

  const paths = posts.data.postsConnection.edges.map((post) => ({
    params: { slug: post.node.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
