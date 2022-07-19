import { getAllPostsSimple } from "../services/getPosts";
import { getTagsSimple } from "../services/getTags";
import { getCategoriesSimple } from "../services/getCategories";
import { getSeriesSimple } from "../services/getSeries";

const URL = "https://chumbers.io";

function generatePartialSiteMap(items, path) {
  return `
     ${items
       .map(({ slug, updatedAt }) => {
         return `
       <url>
           <loc>${`${URL}/${path}/${slug}`}</loc>
           <lastmod>${updatedAt}</lastmod>
       </url>
     `;
       })
       .join("")}
 `;
}

function generateFullSiteMap(sitemap) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://chumbers.io</loc>
     </url>
     ${sitemap}
    </urlset>
     `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const { posts } = await getAllPostsSimple();
  const tags = await getTagsSimple();
  const categories = await getCategoriesSimple();
  const series = await getSeriesSimple();

  // We generate the XML sitemap with the posts data
  let sitemap = "";
  sitemap += generatePartialSiteMap(posts, "content");
  sitemap += generatePartialSiteMap(tags, "tags");
  sitemap += generatePartialSiteMap(categories, "categories");
  sitemap += generatePartialSiteMap(series, "series");

  sitemap = generateFullSiteMap(sitemap);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
