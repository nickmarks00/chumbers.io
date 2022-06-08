import React from "react";
import Link from "next/link";

import PostImage from "../components/PostImage";
import Codeblock from "../components/Codeblock";

import { BiLink } from "react-icons/bi";

const components = {
  h1: ({ id, ...rest }) => {
    if (id) {
      return (
        <Link href={`#${id}`}>
          <a className="flex items-center ">
            <BiLink className="relative -ml-2 mt-2 w-8 h-8 bg-gray-200 rounded-md opacity-60 mr-2 transition duration-200 hover:text-teal" />
            <h2
              className="post-heading font-display text-3xl font-bold mt-4 mb-2 underline--magical"
              {...rest}
              id={id}
            />
          </a>
        </Link>
      );
    }
    return (
      <h2
        className="post-heading font-display text-3xl font-bold mt-4 mb-2"
        {...rest}
        id={id}
      />
    );
  },
  h2: ({ id, ...rest }) => {
    if (id) {
      return (
        <Link href={`#${id}`}>
          <a className="flex items-center ">
            <BiLink className="relative -ml-2 mt-2 w-6 h-6 bg-gray-200 rounded-md opacity-60 mr-2 transition duration-200 hover:text-teal" />
            <h3
              className="post-heading font-display text-2xl font-bold mt-4 mb-2 underline--magical"
              {...rest}
              id={id}
            />
          </a>
        </Link>
      );
    }
    return (
      <h3
        className="post-heading font-display text-2xl font-bold mt-4 mb-2"
        {...rest}
        id={id}
      />
    );
  },
  h3: ({ id, ...rest }) => {
    if (id) {
      return (
        <Link href={`#${id}`}>
          <a className="flex items-center ">
            <BiLink className="relative -ml-2 mt-2 w-6 h-6 bg-gray-200 rounded-md opacity-60 mr-2 transition duration-200 hover:text-teal" />
            <h4
              className="post-heading font-display text-xl font-bold mt-4 mb-2 underline--magical"
              {...rest}
              id={id}
            />
          </a>
        </Link>
      );
    }
    return (
      <h4
        className="post-heading font-display text-xl font-bold mt-4 mb-2"
        {...rest}
        id={id}
      />
    );
  },
  h4: ({ id, ...rest }) => {
    if (id) {
      return (
        <Link href={`#${id}`}>
          <a className="flex items-center ">
            <BiLink className="relative -ml-2 mt-2 w-5 h-5 bg-gray-200 rounded-md opacity-60 mr-2 transition duration-200 hover:text-teal" />
            <h5
              className="post-heading font-display text-lg  font-bold mt-4 mb-2 underline--magical"
              {...rest}
              id={id}
            />
          </a>
        </Link>
      );
    }
    return (
      <h5
        className="post-heading font-display text-lg font-bold mt-4 mb-2"
        {...rest}
        id={id}
      />
    );
  },
  h5: ({ id, ...rest }) => {
    if (id) {
      return (
        <Link href={`#${id}`}>
          <a className="flex items-center ">
            <BiLink className="relative -ml-2 mt-2 w-8 h-8 bg-gray-200 rounded-md opacity-60 mr-2 transition duration-200 hover:text-teal" />
            <h6
              className="post-heading font-display text-md font-bold mt-4 mb-2 underline--magical"
              {...rest}
              id={id}
            />
          </a>
        </Link>
      );
    }
    return (
      <h6
        className="post-heading font-display text-md font-bold mt-4 mb-2"
        {...rest}
        id={id}
      />
    );
  },
  p: ({ children, props }) => (
    <p className="post-paragraph font-display mt-4 mb-4 font-md" {...props}>
      {children}
    </p>
  ),
  code: ({ props }) => {
    return (
      <code
        className="whitespace-pre-wrap bg-gray-100 rounded-md px-2 py-1"
        style={{
          color: "#EB5757",
          backgroundColor: "rgba(135,131,120,0.15)",
        }}
      >
        {props}
      </code>
    );
  },
  a: ({ children, openInNewTab, href, rel, ...rest }) => {
    if (href.match(/^https?:\/\/|^\/\//i)) {
      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : "_self"}
          rel={rel || "noopener noreferrer"}
          className="underline--magical"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href}>
        <a className="underline--magical" {...rest}>
          {children}
        </a>
      </Link>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="ml-2 my-4 py-2 font-display text-2xl pl-4 border-l-4 border-off-black italic transition duration-500 ease-out hover:border-teal bg-tertiary rounded-sm">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => {
    return <PostImage src={src} altText={alt} />;
  },
  li: ({ children }) => {
    return <li className="leading-7 not-pg">{children}</li>;
  },
  ul: ({ children }) => <ul className="ml-6 list-disc not-pg">{children}</ul>,
  ol: ({ children }) => (
    <ol className="ml-6 list-decimal not-pg">{children}</ol>
  ),
  table: ({ children }) => (
    <section className="grid place-items-center my-6">
      <table className="border border-off-black w-5/6">{children}</table>
    </section>
  ),
  thead: ({ children, ...props }) => {
    return (
      <thead className="h-12 border-b border-off-black bg-teal">
        {children}
      </thead>
    );
  },
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="h-12 border-b border-off-black">{children}</tr>
  ),
  td: ({ children }) => (
    <td className="border-r border-off-black text-center min-w-max px-2">
      {children}
    </td>
  ),
  th: ({ children }) => (
    <th className="border-r border-off-black text-center min-w-max px-2">
      {children}
    </th>
  ),
  pre: (props) => <Codeblock {...props} />,
  iframe: (props) => {
    return (
      <div className="relative overflow-hidden w-full h-80 lg:96 my-6">
        <iframe className="w-full h-full" {...props} title={props.title} />
      </div>
    );
  },
};

export default components;
