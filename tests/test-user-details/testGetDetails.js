const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (user) => {
	describe("test auth user get details", () => {
		let token;
		beforeAll(async () => {
			const res = await supertest(app).post("/user/login").send({
				email: user.email,
				password: user.password
			});
			token = res.body.token;
		});

		const url = "/auth/user/get/details";

		it("returns code:200 msg:Details sent successfully", async () => {
			const res = await supertest(app)
				.post(url)
				.send({
					email: user.email
				})
				.set("Authorization", `Bearer ${token}`);

			expect(res.statusCode).toBe(200);
			expect(res.body.msg).toEqual("Details sent successfully");
			console.log(res.body);
			expect(res.body.data.gender).toEqual(user.gender);
			expect(res.body.data.weight).toEqual(user.weight);
			expect(res.body.data.weightGoal).toEqual(user.weightGoal);
			expect(res.body.data.height).toEqual(user.height);
			expect(res.body.data.currentActivityLevel).toEqual(
				user.currentActivityLevel
			);
			expect(res.body.data.dateOfBirth).toEqual(user.dateOfBirth);
		});
	});
};
