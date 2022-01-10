import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import PostImage from "../components/PostImage";
import Codeblock from "../components/Codeblock";
import { Link } from "gatsby";

const ContentBody = ({ content }) => {
  return (
    <RichText
      content={content.raw}
      renderers={{
        h1: ({ children }) => (
          <h2 className="font-display text-3xl font-bold mt-4 mb-2">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h3 className="font-display text-2xl font-bold mt-4 mb-2">
            {children}
          </h3>
        ),
        h3: ({ children }) => (
          <h4 className="font-display text-xl font-bold mt-3 mb-1">
            {children}
          </h4>
        ),
        h4: ({ children }) => (
          <h5 className="font-display text-lg font-bold mt-3 mb-1">
            {children}
          </h5>
        ),
        h5: ({ children }) => (
          <h6 className="font-display text-md font-bold mt-3 mb-1">
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="post-paragraph leading-7 mt-4 mb-4 font-md">
            {children}
          </p>
        ),
        code: ({ children }) => (
          <code
            className="whitespace-pre-wrap bg-gray-100 rounded-md px-2 py-1"
            style={{
              color: "#EB5757",
              backgroundColor: "rgba(135,131,120,0.15)",
            }}
          >
            {children}
          </code>
        ),
        code_block: ({ children }) => (
          <pre>
            <code>
              <span className="text-black bg-gray-100 border border-black rounded-md px-1 break-words w-full my-6">
                {children}
              </span>
            </code>
          </pre>
        ),
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
            <Link to={href} className="underline--magical" {...rest}>
              {children}
            </Link>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="ml-2 my-4 py-2 font-display text-2xl pl-4 border-l-4 border-off-black italic transition duration-500 ease-out hover:border-teal bg-tertiary rounded-sm">
            {children}
          </blockquote>
        ),
        img: ({ src, altText }) => <PostImage src={src} altText={altText} />,
        li: ({ children }) => <li className="leading-7">{children}</li>,
        ul: ({ children }) => <ul className="ml-6 list-disc">{children}</ul>,
        ol: ({ children }) => <ol className="ml-6 list-decimal">{children}</ol>,
        table: ({ children }) => (
          <section className="grid place-items-center">
            <table className="border border-off-black w-5/6">{children}</table>
          </section>
        ),
        table_head: ({ children }) => (
          <thead className="h-12 border-b border-off-black bg-teal">
            {children}
          </thead>
        ),
        table_body: ({ children }) => <tbody>{children}</tbody>,
        table_row: ({ children }) => (
          <tr className="h-12 border-b border-off-black">{children}</tr>
        ),
        table_cell: ({ children }) => (
          <td className="border-r border-off-black text-center min-w-max px-2">
            {children}
          </td>
        ),
        class: ({ children, className }) => {
          const code = children?.props?.content[0]?.children[0].text
            ? children?.props?.content[0]?.children[0].text
            : "Something went wrong...";

          if (children?.props.content[0]?.type === "code-block") {
            return <Codeblock language={className} blockCode={code.trim()} />;
          } else {
            return <div className={className}>{children}</div>;
          }
        },
        embed: {
          Category: ({ nodeId }) => {
            return (
              <div>
                <h3>{nodeId}</h3>
              </div>
            );
          },
          Tag: ({ nodeId }) => {
            return (
              <div>
                <h3>{nodeId}</h3>
              </div>
            );
          },
        },
      }}
    />
  );
};

export default ContentBody;
