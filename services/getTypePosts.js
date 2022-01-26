import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getFeatured = async () => {
  const result = await client.query({
    query: gql`
      query {
        posts(
          first: 5
          orderBy: createdAt_DESC
          where: { featuredPost: true }
        ) {
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
        posts(first: 3, orderBy: createdAt_DESC) {
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

export const getRelatedPosts = async (slug, tags) => {
  const result = await client.query({
    query: gql`
      query GetRelatedPosts($slug: String!, $tags: [String!]) {
        posts(
          where: { slug_not: $slug, AND: { tags_some: { slug_in: $tags } } }
          last: 3
        ) {
          title
          heroImage {
            url
          }
          featuredPost
          excerpt
          content {
            markdown
          }
          createdAt
          slug
        }
      }
    `,
    variables: { slug: slug, tags: tags },
  });

  return result.data.posts;
};
