const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (user) => {
	describe("test update groceries", () => {
		const url = "/auth/user/update/details";

		it("returns code:200 msg:Groceries updated successfully", async () => {
			const res = supertest(app)
				.post(url)
				.send({
					email: user.email
				})
				.set("Authorization", `Bearer ${user.token}`);
		});
	});
};
