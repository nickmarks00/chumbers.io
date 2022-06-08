import React from "react";
import Link from "next/link";
import Image from "next/image";

const UnderConstruction = () => {
  return (
    <main className="text-center w-full my-10 notbuilt">
      <div className="notfound-404">
        <Image
          src="/images/undraw_building_blocks_re_rwls.svg"
          alt="under construction graphic"
          width="200px"
          height="200px"
          className={{ height: "50%", width: "50%", margin: "0 auto" }}
        />
      </div>
      <h1 className="font-display text-gray-200 font-bold text-2xl mt-8">
        Page Under Construction
      </h1>
      <p className="text-white my-3">Come back soon.</p>
      <Link href="/">
        <a className="bg-white">Return Home</a>
      </Link>
    </main>
  );
};

export default UnderConstruction;
