import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getFeatured = async () => {
  const result = await client.query({
    query: gql`
      query {
        posts(
          first: 5
          orderBy: updatedAt_DESC
          where: { featuredPost: true }
        ) {
          category {
            name
            categoryTheme {
              hex
            }
            slug
          }
          updatedAt
          featuredPost
          heroImage {
            url
            alternate
          }
          slug
          title
          tags {
            name
            slug
          }
          excerpt
          id
        }
      }
    `,
  });

  return result.data.posts;
};

export const getLatest = async () => {
  const result = await client.query({
    query: gql`
      query {
        posts(first: 3, orderBy: updatedAt_DESC) {
          category {
            name
            categoryTheme {
              hex
            }
            slug
          }
          createdAt
          featuredPost
          heroImage {
            url
            alternate
          }
          publishedAt
          slug
          title
          tags {
            name
            slug
          }
          content {
            markdown
          }
          id
        }
      }
    `,
  });

  return result.data.posts;
};
