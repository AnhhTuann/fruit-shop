import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($productIds: [ID!]!) {
    createOrder(productIds: $productIds) {
      id
      total
      status
      createdAt
    }
  }
`;
