const supertest = require("supertest");
const app = require("../../src/app");

module.exports = () => {
	describe("test validation", () => {
		const url = "/user/login";
		it("returns code:400 msg:Email is invalid", async () => {
			const res = await supertest(app).post(url).send({
				password: "password"
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.errors[0].msg).toEqual("Email is invalid");
		});
	});
};
