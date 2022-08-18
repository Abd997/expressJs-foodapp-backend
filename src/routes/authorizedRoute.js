const {
	reportUser,
	blockUser,
	addUserStory,
	getStory,
	addUserPost,
	getAllUserPosts,
	updatePostLike,
	addPostComment,
	getPostComments,
	getUserComment,
	updateUser,
	getUserDetails,
	addGroceries,
	updateFavouriteFood,
	getFavouriteFoods,
	getAddresses,
	addAddress,
	removeAddress,
	updateAddress,
	addFeedback,
	addMealLike,
	removeMealLike,
	getFeed,
	updateMealLike,
	flagUser,
	createCheckoutSession,
	checkoutSuccess,
	checkoutFailure,
	checkoutCancel,
	validateCoupon,
	getAllGroceries,
	addGrocery,
	getUserGroceries,
	saveExplorePost,
	getDeals,
	getExplorePost,
	getUserSavedPosts,
	getAllExplorePost,
	getAllStories,
	addUserAvatar,
	getUserAvatar,
	getUserDashboardDetails
} = require("../controllers");
const bank_info = require("../controllers/bank-info");
const user_story = require("../controllers/user-story");

const multerUpload = require("../utils/multerUpload");
const verifyToken = require("../utils/verifyToken");
const route = require("express").Router();

// ============ USER CHAT ============

// ============ BANK CARD ============
route.post("/bankcard", bank_info.addCard);
route.post("/subscription", bank_info.addSubscription);
route.put("/bankcard", bank_info.editCard);
route.delete("/subscription", bank_info.cancelSubscription);
route.delete("/bankcard", bank_info.deleteCard);
route.get("/bankcard", bank_info.getCard);
route.get("/balance", bank_info.getBalance);

// ============ DASHBOARD ============
route.get("/dashboard", getUserDashboardDetails);

// ============ EXPLORE ============
route.get("/explore", getAllExplorePost);
route.get("/explore/type/:type", getExplorePost);
route.get("/explore/saved-posts", getUserSavedPosts);
route.put("/explore/save-post", saveExplorePost);

// ============ CHECKOUT ============
route.post("/checkout/create-intent", createCheckoutSession);
route.get("/checkout/validate-coupon/:couponNumber", validateCoupon);
route.get("/checkout/success", checkoutSuccess);
route.get("/checkout/failure", checkoutFailure);
route.get("/checkout/cancel", checkoutCancel);

// ============ USER ============
route.put(
	"/avatar",
	multerUpload.single("image"),
	verifyToken,
	addUserAvatar
);
route.get("/avatar", getUserAvatar);

// ============ USER SAFETY ============
route.post("/report-user", reportUser);
route.post("/block-user", blockUser);
route.post("/flag-user", flagUser);

// ============ USER STORY ============
route.post(
	"/story",
	multerUpload.single("story"),
	verifyToken,
	addUserStory
);
route.get("/story/:storyUserEmail", getStory);
route.get("/stories", getAllStories);
route.put("/story/like", user_story.updateStoryLike);

// ============ USER POST ============
route.post(
	"/userpost",
	multerUpload.single("image"),
	verifyToken,
	addUserPost
);
route.get("/userposts", getAllUserPosts);
route.put("/userpost/like", updatePostLike);
route.post("/userpost/comment", addPostComment);
route.get("/userpost/comments/:postId", getPostComments);

// not working properly
route.get("/userpost/comment/:commentId", getUserComment);

// ============ DETAILS ============
route.put("/user", updateUser);
route.get("/user", getUserDetails);

// ============ GROCERIES ============
route.post("/groceries", addGroceries);
route.get("/available-groceries", getAllGroceries);
route.get("/groceries", getUserGroceries);
route.post("/grocery", addGrocery);

// ============ FAVOURITE FOOD ============
route.put("/favouritefood", updateFavouriteFood);
route.get("/favouritefoods", getFavouriteFoods);

// ============ ADDRESSES ============
route.get("/addresses", getAddresses);
route.post("/address", addAddress);
route.delete("/address", removeAddress);
route.put("/address", updateAddress);

// ============ FEEDBACK ============
route.post("/feedback", addFeedback);

// ============ MEAL ============
route.put("/meal/like", updateMealLike);

// route.post("/update/weight-goal", verifyToken);

// ============ FEED ============
route.get("/feed", getFeed);

module.exports = route;
