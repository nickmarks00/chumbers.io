import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

import Vanta from "../components/Vanta";
import { CategoryCarousel } from "../sections/CategoryCarousel";
import Featured from "../sections/Featured";
import Latest from "../sections/Latest";
import TagsList from "../sections/TagsList";
import Seo from "../components/SEO";

import { getCategoriesFull } from "../services/getCategories";
import { getFeatured, getLatest } from "../services/getTypePosts";
import { getTagsLink } from "../services/getTags";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getCategoriesFull().then((res) => setCategories(res));
    getFeatured().then((res) => setFeatured(res));
    getLatest().then((res) => setLatest(res));
    getTagsLink().then((res) => setTags(res));

    const threeScript = document.createElement("script");
    threeScript.setAttribute("id", "threeScript");
    threeScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
    );
    document.getElementsByTagName("head")[0].appendChild(threeScript);
    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);
  return (
    <>
      <Seo title="Welcome" />
      <main className="mx-10 my-10 xl:mx-auto" style={{ maxWidth: 1080 }}>
        <Vanta />
        <CategoryCarousel categories={categories} />
        <Featured featured={featured} />
        <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <Latest latest={latest} />
          <TagsList tags={tags} />
        </div>
      </main>
    </>
  );
}
