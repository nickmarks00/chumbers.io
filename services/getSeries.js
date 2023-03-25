import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getSeriesPaths = async () => {
    const result = await client.query({
        query: gql`
        query MyQuery {
            allSeriesConnection {
                edges {
                    cursor
                    node {
                        slug
                    }
                }
            }
        }
        `,
    });

    return result.data.allSeriesConnection.edges;
};

export const getSeriesSimple = async () => {
    const result = await client.query({
        query: gql`
        query {
            allSeries {
                slug
                updatedAt
            }
        }
        `,
    });

    return result.data.allSeries;
};

export const getSingleSeries = async (slug) => {
    const result = await client.query({
        query: gql`
        query GetSeries($slug: String!) {
            series(where: { slug: $slug }) {
                seriesTitle
                readingTime
                slug
                overview
                posts {
                    featuredPost
                    slug
                    title
                    publishedAt
                    content
                    excerpt
                }
                seriesImage {
                    alternate
                    url
                }
            }
        }
        `,
        variables: { slug: slug },
    });

    return result.data.series;
};
