const server = require("../app");
const request = require("supertest");

describe("POST /register-extra-details", () => {
  it("returns 200 because all parameters were provided and none was empty", async () => {
    const res = await request(server).post("/register-extra-details").send({
      email: "sample@gmail.com",
      gender: "male",
      weight: "55kg",
      weightGoal: "decrease",
      currentActivityLevel: "normal",
      dateOfBirth: "25th April 2022",
      height: "170cm",
    });

    expect(res.statusCode).toEqual(200);
  });

  it("returns 400 because one paramter was empty", async () => {
    const res = await request(server).post("/register-extra-details").send({
      gender: "male",
      weight: "55kg",
      weightGoal: "decrease",
      currentActivityLevel: "normal",
      dateOfBirth: "25th April 2022",
      height: "",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("returns 400 because one paramter was missing", async () => {
    const res = await request(server).post("/register-extra-details").send({
      gender: "male",
      weight: "55kg",
      weightGoal: "decrease",
      currentActivityLevel: "normal",
      dateOfBirth: "25th April 2022",
    });

    expect(res.statusCode).toEqual(400);
  });
});
