import "../styles/globals.scss";
import { useEffect, useRef, useState } from "react";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";

import { SearchContext } from "../context/searchContext";

function useKey(key, cb) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key && event.ctrlKey) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keydown", handle);

    return () => {
      document.removeEventListener("keydown", handle);
    };
  }, [key]);
}

function MyApp({ Component, pageProps }) {
  const [isSearching, setIsSearching] = useState(false);

  const handleEnter = () => {
    setIsSearching(true);
  };

  useKey("KeyY", handleEnter);

  return (
    <SearchContext.Provider value={{ isSearching, setIsSearching }}>
      <ApolloProvider client={client}>
        <Toaster position="bottom-right" />
        <Head>
          <title>chumbers.io</title>
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KZXLFX7');
      `}
        </Script>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SearchContext.Provider>
  );
}

export default MyApp;
