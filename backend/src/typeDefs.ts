export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String
    orders: [Order!]!
  }

  type AuthPayload {
    token: String!
    user: User!
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
    me: User
    products: [Product!]!
    productsByCategory(categoryId: ID!): [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createOrder(productIds: [ID!]!): Order!
  }
`;
