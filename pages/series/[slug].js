import React from "react";
import { useRouter } from "next/router";
import LinkedContent from "../../sections/LinkedContent";
import Loader from "../../components/Loader";

import { getSingleSeries, getSeriesPaths } from "../../services/getSeries";

const Series = ({ series }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <LinkedContent
      name={series.seriesTitle}
      picture={series.seriesImage}
      posts={series.posts}
      description={series.overview}
      isCategory={true}
    />
  );
};

export default Series;

export async function getStaticProps({ params }) {
  const series = await getSingleSeries(params.slug);

  return {
    props: {
      series: series,
    },
  };
}

export async function getStaticPaths() {
  const allSeries = await getSeriesPaths();

  const paths = allSeries.map((series) => ({
    params: { slug: series.node.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
