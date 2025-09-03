import supertest from "supertest";
import { bootstrap } from "./../server";
import request from "supertest";
import { Server } from "http";

describe("QUERY getUser(id: ID!)", () => {
  let httpServer: Server;
  beforeEach(async () => {
    httpServer = await bootstrap();
  });

  afterEach(async () => {
    httpServer.close();
  });

  it("should return a user", async () => {
    const res = await request(httpServer)
      .post("/graphql")
      .timeout(100)
      .send({
        query: `
        query {
          getUser(id: "1") {
            id
            name
            email
          }
        }
      `,
      });
    expect(res.status).toBe(200);
    expect(res.body.data.getUser).toEqual({
      id: "1",
      name: "Teste",
      email: "teste@teste.com",
    });
  });
  it("it should return null if the user does not exist", async () => {
    const res = await request(httpServer)
      .post("/graphql")
      .timeout(100)
      .send({
        query: `
      query {
        getUser(id: "2") {
          id
          name
          email
        }
      }
    `,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.getUser).toEqual(null);
  });

  it("it should return all users", async () => {
    const res = await request(httpServer)
      .post("/graphql")
      .timeout(100)
      .send({
        query: `
        query {
          listUsers {
            id
            name
            email
          }
        }
      `,
      });
    expect(res.status).toBe(200);
    expect(res.body.data.listUsers).toEqual([
      { id: "1", name: "Teste", email: "teste@teste.com" },
    ]);
  });
});
