const addAddress = require("../controllers/addAddress");
const editAddress = require("../controllers/editAddress");
const getAddresses = require("../controllers/getAddresses");
const getFavouriteFoods = require("../controllers/getFavouriteFoods");
const removeAddress = require("../controllers/removeAddress");
const sendFeedback = require("../controllers/sendFeedback");
const updateFavouriteFood = require("../controllers/updateFavouriteFood");
const addMealLike = require("../controllers/addMealLike");
const removeMealLike = require("../controllers/removeMealLike");
const groceries = require("../groceries");
const userExtraDetails = require("../user-extra-details");
const verifyToken = require("../utils/verifyToken");
const multerUpload = require("../utils/multerUpload");
const handleUploadStory = require("../controllers/handleUploadStory");
const handleGetStory = require("../controllers/handleGetStory");
const handleUploadPost = require("../controllers/handleUploadPost");

const route = require("express").Router();

route.post(
  "/upload/story",
  verifyToken,
  multerUpload.single("image"),
  handleUploadStory
);

route.get("/get/story/:email", verifyToken, handleGetStory);

route.post("/upload/post", multerUpload.single("image"), handleUploadPost);

// route.post("/post", handleGetPost);

route.post("/", verifyToken, (req, res) => {
  res.json({ msg: "User is authorized" });
});

route.post(
  "/update/details",
  userExtraDetails.validateUpdateReq,
  verifyToken,
  userExtraDetails.updateDetails
);

route.post(
  "/get/details",
  userExtraDetails.validateGetReq,
  verifyToken,
  userExtraDetails.getDetails
);

route.post(
  "/update/groceries",
  groceries.validateReq,
  verifyToken,
  groceries.addGroceries
);

route.post("/update/favourite-food", verifyToken, updateFavouriteFood);

route.get("/favourite-food/:email", verifyToken, getFavouriteFoods);

//--------ADDRESSES--------
route.get("/address/:email", getAddresses);
route.post("/add/address", verifyToken, addAddress);
route.post("/remove/address", verifyToken, removeAddress);
route.post("/edit/address", verifyToken, editAddress);

//--------FEEDBACK--------
route.post("/feedback", verifyToken, sendFeedback);

route.post("/meal/add/like", verifyToken, addMealLike);
route.post("/meal/remove/like", verifyToken, removeMealLike);

route.post("/update/weight-goal", verifyToken);

module.exports = route;
