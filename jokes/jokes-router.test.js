const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

test("GET /api/jokes to get all jokes, auth required", async () => {
  const register = await request(server)
    .post("/api/auth/register")
    .send({ username: "justin", password: "pass" });
  const login = await request(server)
    .post("/api/auth/login")
    .send({ username: "justin", password: "pass" });
  const res = await request(server)
    .get("/api/jokes")
    .set("authorization", login.body.token);

  expect(res.body).toHaveLength(20);
  expect(res.body[0]).toHaveProperty("id");
  expect(res.body[0]).toHaveProperty("joke");
});
