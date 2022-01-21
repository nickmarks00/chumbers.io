import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getPostPaths = async () => {
  const result = await client.query({
    query: gql`
      query MyQuery {
        postsConnection {
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

  return result;
};

export const getSinglePost = async (slug) => {
  const result = await client.query({
    query: gql`
      query GetPost($slug: String!) {
        post(where: { slug: $slug }) {
          title
          slug
          updatedAt
          category {
            name
            slug
          }
          content {
            markdown
            html
          }
          heroImage {
            alternate
            url
          }
          featuredPost
          tags {
            name
            slug
          }
          prevPost {
            title
            slug
          }
          nextPost {
            title
            slug
          }
          series {
            seriesTitle
            slug
          }
        }
      }
    `,
    variables: { slug: slug },
  });

  return result.data.post;
};

export const getAllPosts = async () => {
  const result = await client.query({
    query: gql`
      query GetPosts {
        posts {
          title
          slug
          updatedAt
          category {
            name
            slug
          }
          content {
            markdown
          }
          excerpt
          heroImage {
            alternate
            url
          }
          featuredPost
          tags {
            name
            slug
          }
        }
      }
    `,
  });

  return result.data;
};
