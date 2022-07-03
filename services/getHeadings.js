export const getHeadings = (html) => {
  const re = /<h1>(.*?)<\/h1>/g;

  if (html.match(re)) {
    return html.match(re).map((heading) => {
      const headingText = heading
        .replace("<h1>", "")
        .replace("</h1>", "")
        .replace(/\&#39;/g, "'")
        .replace(/\&quot;/g, `\"`);

      const link =
        "#" +
        headingText
          .replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9\-]/g, "")
          .toLowerCase();

      return {
        text: headingText,
        link,
      };
    });
  }

  return [];
};
