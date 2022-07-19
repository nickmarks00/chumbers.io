import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `< src="https://www.googletagmanager.com/ns.html?id=GTM-KZXLFX7"
        height="0" width="0" style="display:none;visibility:hidden"/>`,
        }}
      />
    </Html>
  );
}
