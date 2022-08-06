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
	updateMealLike
} = require("../controllers");

const multerUpload = require("../utils/multerUpload");
const verifyToken = require("../utils/verifyToken");
const route = require("express").Router();

// ------------USER SAFETY------------
route.post("/report-user", reportUser);
route.post("/block-user", blockUser);

// ------------STORY------------
route.post("/story", multerUpload.single("image"), addUserStory);
route.get("/story", getStory);

// ------------POST------------
route.post(
	"/userpost",
	multerUpload.single("image"),
	verifyToken,
	addUserPost
);
route.get("/userposts", getAllUserPosts);
route.put("/userpost/like", updatePostLike);
route.post("/userpost/comment", addPostComment);
route.get("/userpost/:postId/comments", getPostComments);
// not working properly
route.get("/userpost/comment/:commentId", getUserComment);

// route.post("/post", handleGetPost);

// ------------DETAILS------------
route.put("/user", updateUser);
route.get("/user", getUserDetails);

// ------------GROCERIES------------
route.post("/groceries", addGroceries);

// ------------FAVOURITE FOOD------------
route.put("/favouritefood", updateFavouriteFood);
route.get("/favouritefoods", getFavouriteFoods);

// ------------ADDRESSES------------
route.get("/addresses", getAddresses);
route.post("/address", addAddress);
route.delete("/address", removeAddress);
route.put("/address", updateAddress);

// ------------FEEDBACK------------
route.post("/feedback", addFeedback);

// ------------MEAL------------
route.put("/meal/like", updateMealLike);

// route.post("/update/weight-goal", verifyToken);

// ------------FEED------------
route.get("/feed", getFeed);

module.exports = route;
