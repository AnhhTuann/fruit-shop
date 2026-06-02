import { useQuery, gql } from '@apollo/client';
import { Product } from '../types';

const GET_PRODUCTS = gql`
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

export function useProducts() {
  const { data, loading, error } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  
  return {
    products: data?.products || [],
    loading,
    error,
  };
}
