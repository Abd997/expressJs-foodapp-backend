const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (user) => {
	describe("test validation", () => {
		const url = "/auth/user/update/details";

		it("returns code:400 msg:Email is invalid", async () => {
			const res = await supertest(app).post(url).send({
				gender: user.gender,
				weight: user.weight,
				weightGoal: user.weightGoal,
				currentActivityLevel: user.currentActivityLevel,
				dateOfBirth: user.dateOfBirth,
				height: user.height
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.errors[0].msg).toEqual("Email is invalid");
		});
	});
};
