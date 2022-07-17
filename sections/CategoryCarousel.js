import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { BsArrowRightCircleFill } from "react-icons/bs";

export const CategoryCarousel = ({ categories }) => {
  // let categoryCarouselWindow;

  // const forceScroll = () => {
  //   categoryCarouselWindow = document.getElementById("categoryCarousel");
  //   categoryCarouselWindow.scrollTo({
  //     left: -10000,
  //     behavior: "smooth",
  //   });
  // };

  // useEffect(() => {
  //   forceScroll();
  //   window.addEventListener("resize", function () {
  //     forceScroll();
  //   });

  //   return () => {
  //     window.removeEventListener("resize", forceScroll);
  //   };
  // }, []);

  return (
    <section className="text-center mt-6">
      <div className="flex text-center">
        <h2 className="text-3xl text-white underline--magical font-display font-bold z-10">
          <Link href="/latest">
            <a>Categories</a>
          </Link>
        </h2>
      </div>
      <section
        className="flex flex-row-reverse p-12 overflow-x-auto card-list justify-items-center"
        id="categoryCarousel"
      >
        <Link key="all" href={`/categories`}>
          <a className="flex flex-col justify-items-center rounded-2xl card overflow-hidden cursor-pointer shadow-xl bg-teal container relative opacity-90">
            <div className="absolute ml-24 inset-y-1/2 -translate-x-1/2 flex">
              <h2
                className="font-display text-black text-2xl font-bold lowercase my-auto underline--magical"
                style={{
                  backgroundImage: `linear-gradient(120deg, #fff 0%, #fff 100%)`,
                }}
              >
                all
              </h2>
              <BsArrowRightCircleFill
                style={{ height: 20, width: 20, margin: "10 0 0 5" }}
              />
            </div>
          </a>
        </Link>
        {categories.map((category) => (
          <Link key={category.name} href={`/categories/${category.slug}`}>
            <a className="flex flex-col justify-items-center rounded-lg card overflow-hidden cursor-pointer shadow-lg container relative z-0">
              <Image
                src={category.categoryPicture.url}
                alt={category.categoryPicture.alternate}
                layout="fill"
                priority
                quality="50"
                objectFit="cover"
                className="h-full object-cover absolute  z-50"
              />
              <div className="absolute inset-y-1/2 -translate-x-1/2 ml-16">
                <h2
                  className="font-display text-white text-2xl font-bold lowercase my-auto underline--magical-def"
                  style={{
                    backgroundImage: `linear-gradient(120deg, ${category.categoryTheme.hex} 0%, ${category.categoryTheme.hex} 100%)`,
                  }}
                >
                  {category.name}
                </h2>
              </div>
            </a>
          </Link>
        ))}
      </section>
    </section>
  );
};
