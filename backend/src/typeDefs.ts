export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    orders: [Order!]!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    products: [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String
    category: Category!
  }

  type Order {
    id: ID!
    user: User!
    products: [Product!]!
    total: Float!
    status: String!
    createdAt: String!
  }

  type Query {
    products: [Product!]!
    productsByCategory(categoryId: ID!): [Product!]!
  }

  type Mutation {
    createOrder(userId: ID!, productIds: [ID!]!): Order!
  }
`;
