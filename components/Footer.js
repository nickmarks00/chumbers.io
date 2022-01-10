import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiYoutube, FiLinkedin, FiGithub } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BsDownload } from "react-icons/bs";

import { lowerNavigation } from "../data/lowerNavigation";
import InputField from "./InputField";

const Footer = ({ categories }) => {
  return (
    <footer className="bg-off-black px-10 pb-4 z-10">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4  mb-4 pb-8 border-t border-gray-100 pt-6">
        <FooterColumn
          key="browse"
          heading="browse"
          list={lowerNavigation[0][1]}
        />
        <FooterColumn key="more" heading="more" list={lowerNavigation[2][1]} />
        <FooterColumn key="categories" heading="categories" list={categories} />
        <div className="col-span-2 flex flex-col text-sm">
          <h4 className="text-gray-200 uppercase font-semibold">
            Subscribe to receive updates
          </h4>
          <p className="text-gray-200">
            Get the latest posts, articles and courses sent directly to your
            inbox
          </p>
          <InputField
            type="email"
            label="Notify me (coming soon...)"
            placeholder="E-mail"
            btnLabel="send"
            isEmail={true}
            id="footerNotify"
            className="text-gray-400"
          />
        </div>
      </div>
      <div className="sm:mt-7 md:mt-auto pt-6 pb-8 sm:flex sm:justify-between border-t border-gray-100 xs:block">
        <article className="text-white font-medium xs:mb-4 sm:mb-3 flex flex-col md:flex-row">
          <span>&copy; {new Date().getFullYear()} chumbers.com.</span>
          <div className="flex items-center md:ml-2">
            Built with{" "}
            <a href="https://www.nextjs.org" className="ml-2">
              <Image
                height="20px"
                width="20px"
                src="/images/next.ico"
                alt="next-icon"
              />
            </a>
            <a
              href="https://www.apollographql.com/"
              className="ml-2 bg-white rounded-full"
            >
              <Image
                height="20px"
                width="20px"
                src="/images/apollo.png"
                alt="apollo-gql-icon"
              />
            </a>
            <a href="https://www.graphcms.com" className="ml-2">
              <Image
                height="20px"
                width="20px"
                src="/images/graphcms.png"
                alt="graphcms-icon"
              />
            </a>
            <a href="https://www.vercel.com" className="ml-2">
              <Image
                height="20px"
                width="20px"
                src="/images/vercel.ico"
                alt="vercel-icon"
              />
            </a>
          </div>
        </article>
        <div className="text-gray-500 flex xs:mt-4 sm:mt-1">
          <a href="https://www.youtube.com/c/Chumbers" className="icon">
            <FiYoutube />
          </a>
          <a href="https://linkedin.com/in/nickmarks00" className="icon">
            <FiLinkedin />
          </a>
          <a href="https://github.com/nickmarks00" className="icon">
            <FiGithub />
          </a>
          <a href="mailto:nd.marks00@gmail.com" className="icon">
            <MdOutlineEmail />
          </a>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ heading, list }) => {
  return (
    <div key={heading} className="flex flex-col pl-4 justify-start">
      <h4 className="text-gray-200 text-sm uppercase font-semibold">
        {heading}
      </h4>
      {list.map((row, index) => (
        <>
          {row.name !== "resume" ? (
            <Link
              key={index}
              href={
                heading === "categories" ? `/categories/${row.slug}` : row.slug
              }
            >
              <a className="cursor-pointer text-gray-200 capitalize text-sm mb-1">
                {row.name}
              </a>
            </Link>
          ) : (
            <a
              className=" cursor-pointer text-gray-200 capitalize text-sm mb-1"
              role="menuitem"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              download
              key={index}
            >
              <span className="flex items-center">
                <p className="mr-2">{row.name}</p>
                <BsDownload />
              </span>
            </a>
          )}
        </>
      ))}
      {heading === "categories" && (
        <Link key="all" href="/categories">
          <a className="cursor-pointer text-gray-200 capitalize text-sm mb-1">
            all
          </a>
        </Link>
      )}
    </div>
  );
};

export default Footer;
