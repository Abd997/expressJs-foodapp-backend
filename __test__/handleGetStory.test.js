const dotenv = require("dotenv").config();
const app = require("../app");
const request = require("supertest");

describe("test authorization check", () => {
  it("check 401 when no token provided", async () => {
    const res = await request(app).post("/story").send({});
    expect(res.statusCode).toEqual(401);
  });

  it("check 401 because invalid token provided", async () => {
    const headers = { authorization: "bearer: " };
    const res = await request(app).post("/story").set(headers).send();
    expect(res.statusCode).toEqual(401);
  });

  it("check 200 when valid token provided", async () => {
    const headers = {
      authorization:
        "bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2MiOnsiX2lkIjoiNjJhOWZjMjY1MzNlZjA3NjIwNDlkNDc5IiwiZmlyc3ROYW1lIjoiYWJkIiwibGFzdE5hbWUiOiJhc2giLCJlbWFpbCI6ImFiZHVsbGFoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJfX3YiOjAsImN1cnJlbnRBY3Rpdml0eUxldmVsIjoibm9ybWFsIiwiZGF0ZU9mQmlydGgiOiIyMiIsImdlbmRlciI6Im1hbGUiLCJoZWlnaHQiOiIxNjBjbSIsIndlaWdodCI6IjU1a2ciLCJ3ZWlnaHRHb2FsIjoiaW5jcmVhc2UifSwiaWF0IjoxNjU1NDk5NTczfQ.pxdlDeuN_dkI7mFuqXXm2s6KNCj4VRuV6H7qHUwA9oo",
    };
    const res = await request(app).post("/story").set(headers).send();
    expect(res.statusCode).toEqual(200);
  });
});
