import toc from "markdown-toc";
import { remark } from "remark";
import html from "remark-html";

export const getHeadings = async (md) => {
  const processedContent = await remark().use(html).process(toc(md).content);

  const contentHtml = processedContent.toString();

  return contentHtml;
};
