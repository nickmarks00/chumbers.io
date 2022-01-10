export const getHeadings = (html) => {
  const re = /<h1>(.*?)<\/h1>/g;

  if (html.match(re)) {
    return html.match(re).map((heading) => {
      const headingText = heading.replace("<h1>", "").replace("</h1>", "");

      const link = "#" + headingText.replace(/ /g, "-").toLowerCase();

      return {
        text: headingText,
        link,
      };
    });
  }

  return [];
};
