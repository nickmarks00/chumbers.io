import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getCategoriesLink = async () => {
  const result = await client.query({
    query: gql`
      query {
        categories {
          name
          slug
        }
      }
    `,
  });

  return result.data.categories;
};

export const getCategoriesSimple = async () => {
  const result = await client.query({
    query: gql`
      query {
        categories {
          slug
          updatedAt
        }
      }
    `,
  });

  return result.data.categories;
};

export const getCategoriesFull = async () => {
  const result = await client.query({
    query: gql`
      query {
        categories {
          categoryTheme {
            hex
          }
          name
          slug
          updatedAt
          categoryPicture {
            alternate
            attribution
            url
          }
          posts {
            id
          }
        }
      }
    `,
  });

  return result.data.categories;
};

export const getCategoryPaths = async () => {
  const result = await client.query({
    query: gql`
      query MyQuery {
        categoriesConnection {
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

  return result.data.categoriesConnection.edges;
};

export const getSingleCategory = async (slug) => {
  const result = await client.query({
    query: gql`
      query GetCategory($slug: String!) {
        category(where: { slug: $slug }) {
          name
          slug
          posts {
            id
            featuredPost
            slug
            title
            publishedAt
            updatedAt
            content
            excerpt
          }
          categoryPicture {
            alternate
            url
          }
          categoryTheme {
            hex
          }
        }
      }
    `,
    variables: { slug: slug },
  });

  return result.data.category;
};
