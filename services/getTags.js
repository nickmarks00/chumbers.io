import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getTagsLink = async () => {
  const result = await client.query({
    query: gql`
      query {
        tags(orderBy: name_ASC) {
          id
          name
          slug
        }
      }
    `,
  });

  return result.data.tags;
};

export const getTagsSimple = async () => {
  const result = await client.query({
    query: gql`
      query {
        tags {
          slug
          updatedAt
        }
      }
    `,
  });

  return result.data.tags;
};

export const getTagsFull = async () => {
  const result = await client.query({
    query: gql`
      query {
        tags {
          name
          slug
          updatedAt
          post {
            id
          }
        }
      }
    `,
  });

  return result.data.tags;
};

export const getTagPaths = async () => {
  const result = await client.query({
    query: gql`
      query MyQuery {
        tagsConnection {
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

  return result.data.tagsConnection.edges;
};

export const getSingleTag = async (slug) => {
  const result = await client.query({
    query: gql`
      query GetTag($slug: String!) {
        tag(where: { slug: $slug }) {
          name
          slug
          post {
            id
            featuredPost
            slug
            title
            publishedAt
            updatedAt
            content
            excerpt
          }
        }
      }
    `,
    variables: { slug: slug },
  });

  return result.data.tag;
};
