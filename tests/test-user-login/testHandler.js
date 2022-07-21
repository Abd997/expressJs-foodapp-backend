const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (user) => {
	describe("test handler", () => {
		const url = "/user/login";

		it("returns code:200 msg:User successfully authenticated", async () => {
			const res = await supertest(app).post(url).send({
				email: user.email,
				password: user.password
			});

			expect(res.status).toBe(200);
			expect(res.body.msg).toEqual("User successfully authenticated");
			expect(res.body.token).toBeDefined();
		});
	});
};
