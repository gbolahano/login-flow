import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String
    me: User!
    getItems: [Item!]
  }

  type Mutation {
    signup(data: createUserInput): User!
    requestReset(email: String!): SuccessMessage
    resetPassword(
      resetToken: String!
      password: String!
      verifyPassword: String!
    ): User!
    signin(email: String!, password: String!): AuthUser
    signout: SuccessMessage
    createItem(data: createItemInput): Item!
  }

  type SuccessMessage {
    message: String
  }

  scalar DateTime

  type Item {
    title: String!,
    createdAt: DateTime
    user: User!
  }

  input createItemInput {
    title: String!
  }

  type User {
    id: ID
    name: String!
    email: String!
    password: String!
    resetToken: String
    resetTokenExpiry: DateTime
  }

  type AuthUser {
    user: User!
    auth: Boolean
  }

  input createUserInput {
    name: String!
    email: String!
    password: String!
  }
`;

