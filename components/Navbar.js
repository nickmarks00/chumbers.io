import React, { useState } from "react";
import Link from "next/link";
import { FiYoutube, FiLinkedin, FiGithub } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { lowerNavigation } from "../data/lowerNavigation";
import Inputfield from "./Inputfield";

const Navbar = ({ categories }) => {
  const [show, setShow] = useState(false);

  return (
    <nav className="bg-off-black flex flex-col justify-items-center items-center sticky top-0 z-50 w-full py-4">
      <UpperNav setToggle={setShow} isToggled={show} />
      <div
        className={`flex-col md:flex md:flex-row md:justify-items-center justify-between md:w-2/3 md:mx-auto border-t border-gray-100 w-full ${
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

        <Inputfield
          className="md:hidden w-screen mx-auto"
          type="text"
          label="SEARCH (coming soon...)"
          placeholder="Browse the site..."
          btnLabel="search"
          isEmail={false}
          id="navbarSearch"
        />
      </div>
    </nav>
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
      <div className="flex-grow px-2 pb-5 hidden md:flex relative z-10">
        <Inputfield
          type="text"
          label="SEARCH (coming soon...)"
          placeholder="Browse the site..."
          btnLabel="search"
          isEmail={false}
          id="navbarSearch"
          className="text-gray-400"
        />
      </div>
      <div className="flex-shrink-0 text-gray-500 hidden md:flex items-center w-auto px-2 pt-6 pb-2">
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
                href="/resume.pdf"
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
