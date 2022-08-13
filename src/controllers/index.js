module.exports = {
	// ------------ EXPLORE ------------
	saveExplorePost: require("./explore/saveExplorePost"),
	getExplorePost: require("./explore/getExplorePost"),
	getUserSavedPosts: require("./explore/getUserSavedPosts"),
	getAllExplorePost: require("./explore/getAllExplorePost"),

	// ------------ CHECKOUT ------------
	createCheckoutSession: require("./checkout/createCheckoutSession"),
	validateCoupon: require("./checkout/validateCoupon"),
	checkoutSuccess: require("./checkout/checkoutSuccess"),
	checkoutFailure: require("./checkout/checkoutFailure"),
	checkoutCancel: require("./checkout/checkoutCancel"),

	// ------------ FOOD ------------
	addFood: require("./food/addFood"),
	addFoodImage: require("./food/addFoodImage"),
	updateMealLike: require("./food/updateMealLike"),
	getFavouriteFoods: require("./food/getFavouriteFoods"),
	getFoodDetails: require("./food/getFoodDetails"),
	getWeeklyFoods: require("./getWeeklyFoods"),
	updateFavouriteFood: require("./food/updateFavouriteFood"),
	updateMealLike: require("./food/updateMealLike"),

	// ------------ GROCERY ------------
	addGroceries: require("./grocery/addGroceries"),
	getAllGroceries: require("./grocery/getAllGroceries"),
	addGrocery: require("./grocery/addGrocery"),
	getUserGroceries: require("./grocery/getUserGroceries"),

	// ------------ USER ------------
	addUser: require("./user/addUser"),
	getFeed: require("./user/getUserFeed"),
	getUserAuthentication: require("./user/getUserAuthentication"),
	getUserDetails: require("./user/getUserDetails"),
	addUserAvatar: require("./user/addUserAvatar"),
	getUserAvatar: require("./user/getUserAvatar"),

	// ------------ USER ADDRESS ------------
	addAddress: require("./user-address/addAddress"),
	getAddresses: require("./user-address/getAddresses"),
	updateAddress: require("./user-address/updateAddress"),
	removeAddress: require("./user-address/removeAddress"),

	// ------------ USER POSTS ------------
	addPostComment: require("./user-posts/addPostComment"),
	addUserPost: require("./user-posts/addUserPost"),
	getAllUserPosts: require("./user-posts/getAllUserPosts"),
	getPostComments: require("./user-posts/getPostComments"),
	getUserComment: require("./user-posts/getUserComment"),
	updatePostLike: require("./user-posts/updatePostLike"),

	// ------------ USER SAFETY ------------
	reportUser: require("./user-safety/reportUser"),
	blockUser: require("./user-safety/blockUser"),
	flagUser: require("./user-safety/flagUser"),

	// ------------ USER STORY ------------
	addUserStory: require("./user-story/addUserStory"),
	getStory: require("./user-story/getUserStory"),
	getAllStories: require("./user-story/getAllStories"),

	// ------------ OTHERS ------------
	addFeedback: require("./addFeedback"),
	getDiscoverDeals: require("./getDiscoverDeals"),
	updateUser: require("./updateUser"),
	updateUserExtraDetails: require("./updateUserExtraDetails"),
	updateUserWeightGoal: require("./updateUserWeightGoal")
};
