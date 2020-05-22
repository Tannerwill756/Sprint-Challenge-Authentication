const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

test("POST /api/auth/register to be successful", async () => {
  const res = await request(server)
    .post("/api/auth/register")
    .send({ username: "justin", password: "pass" });

  expect(res.status).toBe(201);
  expect(res.body).toMatchObject({
    data: { username: "justin" },
  });
});

test("POST /api/auth/login to be successful", async () => {
  const register = await request(server)
    .post("/api/auth/register")
    .send({ username: "asdf", password: "pass" });
  const res = await request(server)
    .post("/api/auth/login")
    .send({ username: "asdf", password: "pass" });

  expect(res.type).toBe("application/json");
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("token");
});
