import React, { useState } from "react";
import Link from "next/link";

import toast from "react-hot-toast";

import {
  FiYoutube,
  FiLinkedin,
  FiGithub,
  FiMoreHorizontal,
} from "react-icons/fi";
import { AiOutlineMedium, AiOutlineClose } from "react-icons/ai";
import { SiSubstack } from "react-icons/si";
import { FaDev } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { lowerNavigation } from "../data/lowerNavigation";
import Search from "./Search";

const Navbar = ({ categories }) => {
  const [show, setShow] = useState(false);

  return (
    <nav className="bg-off-black flex flex-col justify-items-center items-center sticky top-0 z-50 w-full py-4">
      <UpperNav setToggle={setShow} isToggled={show} />
      <div
        className={`flex-col md:flex md:flex-row md:justify-items-center justify-between text-center md:w-2/3 md:mx-auto border-t border-gray-100 w-full ${
          show ? "flex" : "hidden"
        } transition duration-300 ease-in`}
      >
        <LowerNavDropdown
          isToggled={show}
          name="browse"
          key="browse"
          list={lowerNavigation[0][1]}
        />
        <LowerNavDropdown
          isToggled={show}
          name="categories"
          key="categories"
          list={categories}
        />
        <LowerNavDropdown
          isToggled={show}
          name="more"
          key="more"
          list={lowerNavigation[2][1]}
        />
        <Search className="ml-2 flex md:hidden" />
        <div className="text-gray-500 flex mx-auto md:hidden justify-center w-full p-2">
          <IconSet />
        </div>
      </div>
    </nav>
  );
};

const MoreMenu = () => {
  return (
    <div className="flex-col bg-gray-200 rounded-md bottom-4 right-4 p-4 ul-none font-display font-bold px-3">
      <AiOutlineClose
        className="icon absolute right-3 top-3 cursor-pointer"
        onClick={() => toast.dismiss()}
      />
      <h2 className="font-display text-large underline--magical my-2 inline-block">
        My socials
      </h2>
      <ul className="ul-none mr-5" style={{ listStyleType: "none" }}>
        <li className="mb-2 mx-3">
          <a
            className="transition duration-200 hover:text-teal flex items-center"
            href="mailto:uw0drarf@duck.com"
            target="_blank"
            rel="noreferrer"
          >
            <MdOutlineEmail className="ml-1 mr-3" />
            <p>Email</p>
          </a>
        </li>
        <li className="mb-2 mx-3">
          <a
            className="transition duration-200 hover:text-teal flex items-center"
            href="https://medium.com/@nickmarks00"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineMedium className="ml-1 mr-3" />
            <p>Medium</p>
          </a>
        </li>
        <li className="mb-2 mx-3">
          <a
            className="transition duration-200 hover:text-teal flex items-center"
            href="https://nickmarks.substack.com/publish"
            target="_blank"
            rel="noreferrer"
          >
            <SiSubstack className="ml-1 mr-3" />
            <p>Substack</p>
          </a>
        </li>

        <li className="mb-2 mx-3">
          <a
            className="transition duration-200 hover:text-teal flex items-center"
            href="https://dev.to/"
            target="_blank"
            rel="noreferrer"
          >
            <FaDev className="ml-1 mr-3" />
            <p>Dev.to</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

const IconSet = () => {
  const toastMoreMenu = () => {
    toast.custom(<MoreMenu />, {
      duration: 7000,
      id: "socialToast", // limits to one concurrent toast at a time
    });
  };
  return (
    <>
      <a
        href="https://www.youtube.com/@chumbers."
        className="icon"
        target="_blank"
        rel="noreferrer"
      >
        <FiYoutube />
      </a>
      <a
        href="https://linkedin.com/in/nickmarks00"
        className="icon"
        target="_blank"
        rel="noreferrer"
      >
        <FiLinkedin />
      </a>
      <a
        href="https://github.com/nickmarks00"
        className="icon"
        target="_blank"
        rel="noreferrer"
      >
        <FiGithub />
      </a>

      <FiMoreHorizontal className="icon" onClick={toastMoreMenu} />
    </>
  );
};

const UpperNav = ({ setToggle, isToggled }) => {
  return (
    <div className="flex md:justify-items-center justify-between w-full md:w-2/3 md:mx-auto">
      <h1 className="text-4xl font-display font-bold text-white ml-6 md:ml-0 py-6 md:pt-6 md:pb-4 text-center flex-shrink-0 mr-4 transition duration-600 ease hover:text-teal">
        <Link href="/">
          <a>chumbers</a>
        </Link>
      </h1>
      <Search className="flex-grow hidden md:flex items-center my-auto" />
      <div className="flex-shrink-0 text-gray-500 hidden md:flex items-center w-auto px-2 pt-6 pb-2">
        <IconSet />
      </div>
      <HiOutlineMenuAlt3
        className="text-white cursor-pointer transition duration-500 hover:text-teal md:hidden mx-4 my-auto"
        size="2.5em"
        onClick={() => setToggle(!isToggled)}
      />
    </div>
  );
};

const LowerNavDropdown = ({ list, name }) => {
  return (
    <div className="dropdown w-full md:relative">
      <span>
        <button
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-off-black  hover:text-teal focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          type="button"
        >
          <span className="capitalize">{name}</span>

          <svg
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </span>
      <ul className="overflow-hidden w-full origin-top-right bg-off-black text-white outline-none dropdown-menu">
        {list.map((el, idx) => (
          <li key={idx}>
            {el.name !== "resume" ? (
              <Link
                role="menuitem"
                href={
                  name === "categories" ? `/categories/${el.slug}` : el.slug
                }
              >
                <a className=" py-2 text-sm text-center capitalize block cursor-pointer  dropdown-item max-w-6 ">
                  {el.name}
                </a>
              </Link>
            ) : (
              <a
                className=" py-2 text-sm text-center capitalize block cursor-pointer  dropdown-item max-w-6 "
                role="menuitem"
                href="/NicholasMarks_resume.pdf"
                target="_blank"
                rel="noreferrer"
                download
              >
                <span className="flex items-center justify-center w-full">
                  <p className="mr-2">{el.name}</p>
                  <BsDownload />
                </span>
              </a>
            )}
          </li>
        ))}
        {name === "categories" && (
          <li>
            <Link role="menuitem" href="/categories">
              <a className=" py-2 text-sm text-center capitalize block cursor-pointer  dropdown-item max-w-6 ">
                all
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
