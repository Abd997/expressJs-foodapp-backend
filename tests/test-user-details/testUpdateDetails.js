const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (user) => {
	describe("test auth user update details", () => {
		let token;
		beforeAll(async () => {
			const res = await supertest(app).post("/user/login").send({
				email: user.email,
				password: user.password
			});
			token = res.body.token;
		});

		const url = "/auth/user/update/details";

		it("returns code:200 msg:User updated successfully", async () => {
			const res = await supertest(app)
				.post(url)
				.send({
					email: user.email,
					gender: user.gender,
					weight: user.weight,
					weightGoal: user.weightGoal,
					currentActivityLevel: user.currentActivityLevel,
					dateOfBirth: user.dateOfBirth,
					height: user.height
				})
				.set("Authorization", `Bearer ${token}`);

			expect(res.body.msg).toEqual("User updated successfully");
			expect(res.statusCode).toBe(200);
		});
	});
};
