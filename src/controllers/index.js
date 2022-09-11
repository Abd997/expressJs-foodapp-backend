const getAllOrder = require("../admin-controllers/getAllOrders");

module.exports = {
	// =========== EXPLORE ===========
	saveExplorePost: require("./explore/saveExplorePost"),
	getExplorePost: require("./explore/getExplorePost"),
	getUserSavedPosts: require("./explore/getUserSavedPosts"),
	getAllExplorePost: require("./explore/getAllExplorePost"),

	// =========== CHECKOUT ===========
	createCheckoutSession: require("./checkout/createCheckoutSession"),
	validateCoupon: require("./checkout/validateCoupon"),
	checkoutSuccess: require("./checkout/checkoutSuccess"),
	checkoutFailure: require("./checkout/checkoutFailure"),
	checkoutCancel: require("./checkout/checkoutCancel"),

	// =========== FOOD ===========
	addFood: require("./food/addFood"),
	addFoodImage: require("./food/addFoodImage"),
	updateMealLike: require("./food/updateMealLike"),
	getFavouriteFoods: require("./food/getFavouriteFoods"),
	getAllFoods: require('./food/getAllFoods'),
	getFoodDetails: require("./food/getFoodDetails"),
	getWeeklyFoods: require("./getWeeklyFoods"),
	updateFavouriteFood: require("./food/updateFavouriteFood"),
	updateMealLike: require("./food/updateMealLike"),
	getWeeklyFoodTypes: require("./getWeeklyFoodTypes"),
	getFoodByName: require("./food/getFoodByName"),
	

	// =========== GROCERY ===========
	addGroceries: require("./grocery/addGroceries"),
	getAllGroceries: require("./grocery/getAllGroceries"),
	addGrocery: require("./grocery/addGrocery"),
	getUserGroceries: require("./grocery/getUserGroceries"),
	deleteUserGroceries: require("./grocery/deleteGrocery"),
	updateGrocery: require("./grocery/updateGrocery"),

	// =========== USER =========== 
	addUser: require("./user/addUser"),
	getFeed: require("./user/getUserFeed"),
	getUserAuthentication: require("./user/getUserAuthentication"),
	getUserDetails: require("./user/getUserDetails"),
	addUserAvatar: require("./user/addUserAvatar"),
	getUserAvatar: require("./user/getUserAvatar"),
	getUserRefreshData : require("./user/getUserRefreshData"),
	updateUserPassword: require("./user/updatePassword"),
	deleteUser: require("./user/deleteUser"),

	// =========== USER DASHBOARD ===========
	getUserDashboardDetails: require("./user-dashboard/getUserDashoardDetails"),
	addUserFoodToDashboard: require("./user-dashboard/addUserFood"),
	updateUserSteps: require("./user-dashboard/updateUserSteps"),
	updateUserHeight: require("./user-dashboard/updateUserHieght"), 
	updateUserWeight: require("./user-dashboard/updateUserWeight"),
	updateUserWater: require("./user-dashboard/updateUserWater"),
	userLoginStreak: require("./user-dashboard/userLoginStreak"),
	addUserFoodById: require("./user-dashboard/addUserFoodById"),
	bmiAndNutritionCalculator: require("./user-dashboard/bmiAndNutriCalculator"),

	// =========== USER ADDRESS ===========
	addAddress: require("./user-address/addAddress"),
	getAddresses: require("./user-address/getAddresses"),
	updateAddress: require("./user-address/updateAddress"),
	removeAddress: require("./user-address/removeAddress"),

	// =========== USER POSTS ===========
	addPostComment: require("./user-posts/addPostComment"),
	addUserPost: require("./user-posts/addUserPost"),
	getAllUserPosts: require("./user-posts/getAllUserPosts"),
	getPostComments: require("./user-posts/getPostComments"),
	getUserComment: require("./user-posts/getUserComment"),
	updatePostLike: require("./user-posts/updatePostLike"),

	// =========== USER SAFETY ===========
	reportUser: require("./user-safety/reportUser"),
	blockUser: require("./user-safety/blockUser"),
	flagUser: require("./user-safety/flagUser"),

	// =========== USER STORY ===========
	addUserStory: require("./user-story/addUserStory"),
	getStory: require("./user-story/getUserStory"),
	getAllStories: require("./user-story/getAllUserStories"),

	// =========== OTHERS ===========
	addFeedback: require("./addFeedback"),
	getDiscoverDeals: require("./getDiscoverDeals"),
	updateUser: require("./updateUser"),
	updateUserExtraDetails: require("./updateUserExtraDetails"),
	updateUserWeightGoal: require("./updateUserWeightGoal"),

	// =========== ORDERS ===========

	addNewOrder: require("./orders/addOrder"),
	getPreviousOrders: require("./orders/getPreviousOrders"),
	getPendingOrders: require("./orders/getPendingOrders"),

	// =========== EVENTS ===========	

	getComingEvent: require("./events/getComingEvent"),
	getPreviousEvent: require("./events/getPreviousEvent"),
	bookEventTicket: require("./events/bookEventTicket"),
	willingToAttend: require("./events/willingToGoOnEvent"),
};
