import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getFeatured = async () => {
  const result = await client.query({
    query: gql`
      query {
        posts(
          first: 5
          orderBy: publishedAt_DESC
          where: { featuredPost: true }
        ) {
          category {
            name
            categoryTheme {
              hex
            }
            slug
          }
          publishedAt
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
            post {
              id
            }
          }
          excerpt
          content {
            markdown
          }
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
          excerpt
          content {
            markdown
          }
        }
      }
    `,
  });

  return result.data.posts;
};
