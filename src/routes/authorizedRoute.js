const bank_info = require("../controllers/bank-info");
const user_story = require("../controllers/user-story");

const multerUpload = require("../utils/multerUpload");
const verifyToken = require("../utils/verifyToken");
const route = require("express").Router();
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
	getUserDashboardDetails,
	getAllFoods,
	getWeeklyFoodTypes,
	getUserRefreshData,
	getWeeklyFoods,
	addNewOrder,
	getPreviousOrders,
	getPendingOrders,
	getComingEvent,
	getPreviousEvent,
	bookEventTicket,
	willingToAttend,
	updateUserPassword,
	addUserFoodToDashboard,
	updateUserSteps,
	updateUserHeight,
	updateUserWeight,
	updateUserWater,
	userLoginStreak,
	deleteUser,
	getFoodByName,
	addUserFoodById,
	bmiAndNutritionCalculator,
	deleteUserGroceries,
	updateGrocery,
	addDeviceToken,
	deleteUserPost,
	updateName,
	updateUserWeightGoal,
	getAdminStory,
	getAdminChannel,
	getUserDashboardDetailsByDate,
	getExplorePostByTags,
	getAllCustom,
	addOrderForCustom
} = require("../controllers");

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
route.post("/dashboard/add-food", addUserFoodToDashboard)
route.post("/dashboard/steps", updateUserSteps)
route.post("/dashboard/height", updateUserHeight);
route.post("/dashboard/weight",updateUserWeight);
route.post("/dashboard/water", updateUserWater);
route.post("/dashboard/weight-goal", updateUserWeightGoal);
route.post("/login-streak",userLoginStreak);
route.post('/dashboard/user-food',addUserFoodById)
route.post("/dashboard/calculator", bmiAndNutritionCalculator)
route.get('/dashboard/:date',getUserDashboardDetailsByDate)

// ============ EXPLORE ============
route.get("/explore", getAllExplorePost);
route.get("/explore/type/:type", getExplorePost); 
route.get("/explore/saved-posts", getUserSavedPosts);
route.put("/explore/save-post", saveExplorePost);
route.get("/explore/search",getExplorePostByTags)

// ============ CHECKOUT ============
route.post("/checkout/create-intent", createCheckoutSession);
route.get("/checkout/validate-coupon/:couponNumber", validateCoupon);
route.get("/checkout/success", checkoutSuccess);
route.get("/checkout/failure", checkoutFailure);
route.get("/checkout/cancel", checkoutCancel);

// ============ USER ============
route.post(
	"/avatar",
	multerUpload.single("image"),
	verifyToken,
	addUserAvatar
);
route.get("/avatar", getUserAvatar);
route.get("/refresh-data", getUserRefreshData);
route.post("/updatePassword",updateUserPassword);

// ============ USER SAFETY ============
route.post("/report-user", reportUser);
route.post("/block-user", blockUser);
route.post("/flag-user", flagUser);

// ============ USER STORY ============
route.post(
	"/story",
	multerUpload.single("story"),
	verifyToken,
	user_story.addUserStory
);
route.get("/story/comments", user_story.getAllStoryComments);
route.get("/story/:email", user_story.getUserStory);
route.get("/stories", user_story.getAllUserStories);
route.put("/story/like", user_story.updateStoryLike);
route.post("/story/comment", user_story.postStoryComment);

// =========== USER CHANNELS AND STORIES =================================
route.get("/admin-story", getAdminStory)
route.get("/admin-channels", getAdminChannel)

route.post("/channel",multerUpload.single("cover"),verifyToken, user_story.addUserChannel);
// ============ USER POST ============
route.post(
	"/userpost",
	multerUpload.single("image"),
	verifyToken,
	addUserPost
);
route.get("/userposts", getAllUserPosts);
route.delete("/userpost/:postId",deleteUserPost);
route.put("/userpost/like", updatePostLike);
route.post("/userpost/comment", addPostComment);
route.get("/userpost/comments/:postId", getPostComments);

// not working properly
route.get("/userpost/comment/:commentId", getUserComment);

// ============ DETAILS ============
route.put("/user", updateUser);
route.get("/user", getUserDetails);
route.post("/user/add-device-token", addDeviceToken);
route.delete("/user-account/delete", deleteUser);
route.post("/user/change-name",updateName)

// ============ GROCERIES ============
route.post("/groceries", addGroceries);
route.get("/available-groceries", getAllGroceries);
route.get("/groceries", getUserGroceries);
route.post("/grocery", addGrocery);
route.delete("/grocery/:id", deleteUserGroceries);
route.put("/grocery/:id", updateGrocery)
// ============ FAVOURITE FOOD ============
route.put("/favouritefood", updateFavouriteFood);
route.get("/favouritefoods", getFavouriteFoods);
route.get("/all-food", getAllFoods)
route.get("/food/:name",getFoodByName)
route.get("/custom-food", getAllCustom);

// ============ ADDRESSES ============
route.get("/addresses", getAddresses);
route.post("/address", addAddress);
route.delete("/address/:addressId", removeAddress);
route.put("/address", updateAddress);

// ============ FEEDBACK ============
route.post("/feedback", addFeedback);

// ============ MEAL ============
route.put("/meal/like", updateMealLike);

// route.post("/update/weight-goal", verifyToken);

// ============ FEED ============
route.get("/feed", getFeed);

// ============ Food ============
route.get('/weeklyfood/:weekNumber/:foodType', getWeeklyFoodTypes)
route.get("/weeklyfood/:weekNumber", getWeeklyFoods);

// ============ ORDERS ============
route.post("/order", addNewOrder);
route.post("/custom-order")
route.get("/previousOrders", getPreviousOrders);
route.get("/pendingOrders", getPendingOrders);
route.post("/order/custom",addOrderForCustom)
// ============ EVENTS ============
route.get("/previousEvent", getPreviousEvent);
route.get("/comingEvent", getComingEvent);
route.post("/bookEventTicket", bookEventTicket);
route.post("/willingToAttend",willingToAttend);

module.exports = route;
