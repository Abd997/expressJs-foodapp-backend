const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (user) => {
	describe("test handler", () => {
		const url = "/user/register";

		it("returns code:201 msg:New user has been added successfully", async () => {
			const res = await supertest(app).post(url).send({
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password
			});

			expect(res.statusCode).toBe(201);
			expect(res.body.msg).toEqual(
				"New user has been added successfully"
			);
		});
	});
};
