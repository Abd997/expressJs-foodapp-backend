const admin_food = {
	addFood: require("./addFood"),
	addIngredient: require("./addIngredient"),
	getIngredients: require("./getIngredients"),
	addCustom: require("./admin-custom/addCustom" ),
	getAllCustom : require("./admin-custom/getAllCustom" ),
	addCustomToFood : require("./admin-custom/addCustomToFood"),
};
module.exports = admin_food;
