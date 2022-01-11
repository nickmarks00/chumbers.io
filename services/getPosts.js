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
          course {
            courseTitle
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
        asset(where: { id: "cky59uydk1wpf0c349b7xaetm" }) {
          alternate
          url
        }
      }
    `,
  });

  return result.data;
};
