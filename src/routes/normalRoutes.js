const route = require("express")();
const { authenticateAdmin } = require("../admin-controllers");
const {
	addUser,
	getUserAuthentication,
	getFoodDetails
} = require("../controllers");

route.post("/user/register", addUser);
route.post("/user/login", getUserAuthentication);
route.get("/food-details/:foodId", getFoodDetails);

route.post("/admin/login", authenticateAdmin);
route.get("/admin", async (req, res) => {
	res.render("pages/login");
});

module.exports = route;
