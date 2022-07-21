const supertest = require("supertest");
const app = require("../src/app");

module.exports = () => {
	describe("test verify token util", () => {
		const url = "/auth/user/";
		it("return code:400 msg:No authorization header present", async () => {
			const res = await supertest(app).post(url).send();
			expect(res.statusCode).toBe(400);
			expect(res.body.errors[0].msg).toEqual(
				"No authorization header present"
			);
		});

		it("return code:400 msg:Token not sent", async () => {
			const res = await supertest(app)
				.post(url)
				.set("Authorization", `Bearer `)
				.send();
			expect(res.statusCode).toBe(400);
			expect(res.body.errors[0].msg).toEqual("Token not sent");
		});

		it("return code:400 msg:Token is invalid", async () => {
			const res = await supertest(app)
				.post(url)
				.set("Authorization", `Bearer token`)
				.send();
			expect(res.statusCode).toBe(400);
			expect(res.body.errors[0].msg).toEqual("Token is invalid");
		});
	});
};
