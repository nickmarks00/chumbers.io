import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "../components/Button";
import Codeblock from "../components/Codeblock";
import PostImage from "../components/PostImage";
import PostCard from "../components/PostCard.js";

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
  p: ({ children, props }) => {
    if (
      typeof children == "object" &&
      children?.props &&
      "src" in children.props
    ) {
      return <div>{children}</div>;
    }

    return (
      <p className="post-paragraph font-display mt-4 mb-4 font-md" {...props}>
        {children}
      </p>
    );
  },
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
  a: ({ children, href, ...rest }) => {
    // Internal links
    if (href.match(/(https?:\/\/chumbers.io)|(http:\/\/localhost:3000)/gi)) {
      return (
        <Link href={href}>
          <a className="underline--magical" {...rest}>
            {children}
          </a>
        </Link>
      );
    }

    // External links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline--magical"
        {...rest}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="ml-2 my-4 py-2 font-display text-xl pl-4 border-l-4 border-off-black italic transition duration-500 ease-out hover:border-teal bg-red rounded-sm flex-wrap">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => {
    return <PostImage src={src} altText={alt} />;
  },
  li: ({ children }) => {
    return <li className="leading-7 not-pg my-1">{children}</li>;
  },
  ul: ({ children }) => (
    <ul className="ml-6 list-disc not-pg font-display">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="ml-6 list-decimal not-pg font-display">{children}</ol>
  ),
  table: ({ children }) => (
    <section className="grid place-items-center my-6">
      <table className="border border-off-black w-5/6 font-display">
        {children}
      </table>
    </section>
  ),
  thead: ({ children }) => {
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
    <td className="border border-off-black text-center min-w-max px-2">
      {children}
    </td>
  ),
  th: ({ children }) => (
    <th className="border-r border-off-black text-center min-w-max px-2">
      {children}
    </th>
  ),
  pre: (props) => {
    return <Codeblock {...props} />;
  },
  iframe: (props) => {
    return (
      <iframe
        className="h-full w-full my-6 block"
        {...props}
        title={props.title}
      />
    );
  },
  highlight: ({ text }) => {
    return (
      <span style={{ backgroundColor: "rgba(78, 246, 199, 0.4)" }}>{text}</span>
    );
  },
  button: ({ text, link }) => {
    return (
      <>
        <div className="mt-3 mb-4 text-left">
          <Button
            buttonText={text}
            href={link}
            style="p-3"
            blankTarget={true}
          />
        </div>
        <div className="mt-4">
          <hr className="pt-2"></hr>
        </div>
      </>
    );
  },
  videoembed: ({ url, caption }) => {
    return (
      <figure className="my-4">
        <div className="overflow-hidden max-h-3/4 post-image relative cursor-pointer">
          <video className="max-h-3/4" src={url} controls></video>
        </div>
        <figcaption className="font-display italic text-sm text-gray-500 mt-2">
          {caption}
        </figcaption>
      </figure>
    );
  },
  carousel: ({ images, captions = "" }) => {
    const imageArr = images.split("|");
    const captionArr = captions
      ? captions.split("|")
      : Array.apply(null, Array(imageArr.length)).map(function (_) {
          return "";
        });

    const [currImage, setCurrImage] = useState(0);

    return (
      <>
        <div className="slideshow-container w-full h-full relative m-auto post-image">
          {imageArr.map((image, i) => {
            return (
              <div
                key={i}
                className={`mySlides fade ${
                  currImage == i ? "relative" : "hidden"
                }`}
              >
                <PostImage
                  src={image}
                  altText={`${captionArr[i]} (${i + 1} / ${imageArr.length})`}
                />
              </div>
            );
          })}
          <a
            className="prev"
            onClick={() => setCurrImage((currImage - 1) % imageArr.length)}
          >
            &#10094;
          </a>
          <a
            className="next"
            onClick={() => {
              setCurrImage((currImage + 1) % imageArr.length);
            }}
          >
            &#10095;
          </a>
        </div>

        <div className="text-center">
          {imageArr.map((_, i) => {
            return (
              <span
                key={i}
                className={`dot ${
                  currImage == i ? "bg-teal" : "bg-gray-200"
                } hover:bg-gray-400`}
                onClick={() => {
                  setCurrImage(i);
                }}
              ></span>
            );
          })}
        </div>
        <hr />
      </>
    );
  },
    card: ({img, header, body, link}) => {
        return (
            <Link href={link} className="my-3">
                
            <a
            className="flex justify-between my-3 rounded-lg shadow-lg transform duration-200 ease-out bg-white hover:shadow-xl hover:bg-gray-200  hover:font-bold hover:text-teal cursor-pointer overflow-hidden mb-1"
            style={{ minHeight: "8rem" }}
            >
            <div className="hidden sm:inline w-48">
            <div className="w-48 h-full relative">
            <Image
            src={img}
            alt={header}
            quality="5"
            layout="fill"
            objectFit="cover"
            />
            </div>
            </div>
            <div className="mx-4 py-5 flex-grow">
            <div className="flex">
            <p className="text-gray-500 text-xs mr-2 flex items-center">
            </p>
            </div>
            <p key={header} className="text-md pl-2 whitespace-pre-wrap">
            {header}
            </p>
            <p className="text-sm pl-2 whitespace-pre-wrap text-gray-500">
            {body}
            </p>
            </div>
            </a>
            </Link>
        )
    },
};

export default components;
