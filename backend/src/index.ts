require("dotenv").config({ path: __dirname + "/../variables.env" });
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { ItemResolver } from "./resolvers/Item";
import { typeDefs } from "./schema/typeDefs";
import { decryptToken } from "./libs/utils";
import getEnv from "./config/getEnv";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Item: ItemResolver,
  },
  context: ({ req, res }: any) => ({ req, res }),
});

app.use(cookieParser());

app.use((req: any, _, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next();
  }

  try {
    const user = decryptToken(token);
    req.user = user;
    return next();
  } catch (error) {}

  next();
});

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
  },
});

app.listen({ port: getEnv("PORT", 4000) }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
