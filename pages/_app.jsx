import "../styles/globals.scss";

import { Toaster } from "react-hot-toast";

import Layout from "../components/Layout";
import Head from "next/head";
import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Toaster position="bottom-right" />
      <Head>
        <title>chumbers.io</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
