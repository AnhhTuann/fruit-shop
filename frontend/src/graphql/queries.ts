import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      imageUrl
      category {
        name
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      id
      name
      email
      orders {
        id
        total
        status
        createdAt
        products {
          id
          name
          imageUrl
        }
      }
    }
  }
`;
