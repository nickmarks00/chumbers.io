import React from "react";
import { FiMaximize2 } from "react-icons/fi";
import ModalImage from "react-modal-image";

const PostImage = ({ src, altText }) => {
  return (
    <figure className="my-4">
      <div className="overflow-hidden max-h-3/4 post-image relative cursor-pointer">
        <ModalImage
          small={src}
          large={src}
          alt={altText}
          className="transition duration-300 ease hover:opacity-70 w-screen md:w-auto"
        />
        <FiMaximize2 className="absolute top-3 right-4 text-3xl bg-gray-200 text-off-black p-1 rounded-md transition duration-300 ease-in hover:bg-teal hover:text-white" />
      </div>
      <figcaption className="font-display italic text-sm text-gray-500 mt-2">
        {altText}
      </figcaption>
    </figure>
  );
};

export default PostImage;
