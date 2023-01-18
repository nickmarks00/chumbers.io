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
import { getReadingTime } from "../../services/getReadingTime";
import { mdxSerializer } from "../../services/mdxSerializer";

import Seo from "../../components/SEO";

import BackToTop from "../../components/BackToTop";
import Loader from "../../components/Loader";
import Related from "../../sections/Related";
import ScrollProgressBar from "../../components/ScrollProgressBar";
import TableOfContents from "../../components/TableOfContents";

const Content = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

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

      <Seo title={post.title} description={post.excerpt} />

      {/* <ScrollProgressBar /> */}
      {/* <BackToTop /> */}

      <div className="h-96">
        <div className="w-full h-full relative">
          <Image
            src={post.heroImage.url}
            alt={
              post.heroImage.alternate
                ? post.heroImage.alternate
                : "post hero-image"
            }
            priority={true}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <main className="bg-white p-5 sm:p-10">
        <header className="text-center flex flex-col justify-items-center items-center post-header">
          <aside className="flex justify-center w-full whitespace-pre text-gray-400 ">
            <Link href="/">
              <a className="transition transform duration-300 hover:text-gray-200 hover:underline">{`Home`}</a>
            </Link>
            <p>{`   /   `}</p>
            <Link href={`/categories/${post.category.slug}`}>
              <a className="transition transform duration-300 hover:text-gray-200 hover:underline">{`${post.category.name}`}</a>
            </Link>
            <p>{`   /`}</p>
          </aside>
          <h1 className="text-5xl font-display capitalize">{post.title}</h1>

          <section className="flex flex-col items-center text-xs w-full sm:w-4/5 md:w-2/3 mx-auto items-center">
            <div className="flex flex-col sm:flex-row my-2">
              <article className="flex items-center py-1 mt-1 mr-4">
                <BsFillCalendarFill className="mr-1" />
                {moment(post.publishedAt).format("MMM DD, YYYY")}
              </article>
              <article className="flex items-center py-1 mt-1">
                <BsClock className="mr-1" />
                <p>{getReadingTime(post.content)} min. read</p>
              </article>
            </div>
            {post.series && (
              <Link href={`/series/${post.series.slug}`}>
                <a className="h-10 px-2 py-3 mr-1 my-auto flex items-center rounded-md border-2 border-blue-500 transition transform duration-500 hover:text-white hover:bg-blue-500 font-bold  mb-4">{`${post.series.seriesTitle}`}</a>
              </Link>
            )}
            <article className="flex flex-wrap w-full sm:w-4/5 md:w-3/5 justify-center">
              {post.tags.length > 0 &&
                post.tags.map((tag, idx) => {
                  return (
                    <Link href={`/tags/${tag.slug}`} key={idx}>
                      <a className="h-10 px-2 py-3 mr-1 my-auto flex items-center rounded-md border-2 border-teal transition transform duration-500 hover:text-white hover:bg-teal font-bold lowercase mb-2">{`#${tag.name}`}</a>
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
            {post.headings.length > 0 && (
              <TableOfContents headings={post.headings} />
            )}
            <MDXRemote {...post.mdx} components={components} />
          </div>
        </section>

        {post.series && (
          <section
            className={`justify-between items-end flex my-16 text-sm text-gray-600 xl:mx-auto md:mx-28 xs:mx-3 ${
              !post.prevPost && "flex-row-reverse"
            }`}
            style={{ maxWidth: 740 }}
          >
            {post.prevPost && (
              <Link href={`/content/${post.prevPost.slug}`}>
                <a className=" w-48 flex flex-col items-start text-left transition transform duration-200 hover:text-teal ">
                  <p>{post.prevPost.title}</p>
                  <BsArrowLeft className="w-8 h-8 mt-1" />
                </a>
              </Link>
            )}
            {post.nextPost && (
              <Link href={`/content/${post.nextPost.slug}`}>
                <a className=" w-48 flex flex-col items-end text-right transition transform duration-200 hover:text-teal ">
                  <p>{post.nextPost.title}</p>
                  <BsArrowRight className="w-8 h-8 mt-1" />
                </a>
              </Link>
            )}
            {!post.nextPost && !post.series.isCompleted && (
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

        <section className="my-6">
          <Related slug={post.slug} tags={post.tags.map((tag) => tag.slug)} />
        </section>

        <section>
          <div className="flex items-center">
            <span className="mr-2 min-w-max text-gray-400">Share </span>
            <hr className="w-full" />
          </div>
          <div className="w-full flex justify-center my-8">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?url=${url}&text=${post.title}&via=nickmarks00`}
            >
              <FiTwitter className="h-10 w-10 text-gray-400 hover:text-teal transition duration-300" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://facebook.com/sharer.php?u=${url}`}
            >
              <FiFacebook className="h-10 w-10 text-gray-400 mx-9 hover:text-teal transition duration-300" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin className="h-10 w-10 text-gray-400 hover:text-teal transition duration-300" />
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

  const headings = await getHeadings(post.content);

  const mdx = await mdxSerializer(post.content);

  return {
    props: {
      post: {
        mdx,
        headings,
        ...post,
      },
    },
    revalidate: 60,
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
