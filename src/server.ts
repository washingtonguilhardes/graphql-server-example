import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { getUser, listUsers } from "./resolvers";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUser(id: ID!): User
    listUsers(limit: Int): [User!]!
  }
`;

export async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        getUser: getUser,
        listUsers: listUsers,
      },
    },
  });
  await server.start();
  const app = express();
  const httpServer = http.createServer(app);

  const port = process.env.PORT || 4000;

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  return httpServer;
}
