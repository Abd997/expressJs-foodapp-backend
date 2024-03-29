const express = require("express");
const {
  addWeeklyFood,
  addWeeklyFoodImage,
  addExplorePost,
  getAllOrders,
} = require("../admin-controllers");
const addAmbassador = require("../admin-controllers/addAmbassador");
const { addEvent } = require("../admin-controllers/admin-event");
const { addCustom, getAllCustom, addCustomToFood } = require("../admin-controllers/admin-food");
const admin_food = require("../admin-controllers/admin-food");
const admin_grocery = require("../admin-controllers/admin-grocery");
const admin_stories = require("../admin-controllers/admin-stories");
const deleteUser = require("../admin-controllers/deleteUser");
const multerUpload = require("../utils/multerUpload");
const verifyAdminToken = require("../utils/verifyAdminToken");
const route = express();

// ============ USERS ============
route.post("/users/delete", deleteUser);
// ============ ADMIN CHAT ============

// ============ FOOD REST APIS ============
route.post("/food", admin_food.addFood);
route.post(
  "/food/ingredients",
  multerUpload.single("image"),
  admin_food.addIngredient
);
route.get("/food/ingredients", admin_food.getIngredients);

route.post("/weeklyfood", multerUpload.single("image"), addWeeklyFood);

route.put("/food-image", multerUpload.single("image"), addWeeklyFoodImage);

route.post("/register/ambassador", addAmbassador);

route.post("/explore-post", multerUpload.single("image"), addExplorePost);

route.get("/", async (req, res) => {
  res.render("pages/addGrocery");
});

route.get("/add/grocery.html", async (req, res) => {
  res.render("pages/addGrocery");
});

route.get("/add/food.html", async (req, res) => {
  res.render("pages/addFood");
});

route.get("/list/food.html", async (req, res) => {
  res.render("pages/listFood");
});

route.get("/list/grocery.html", admin_grocery.listGrocery);

// route.post("/grocery", admin_grocery.addGrocery);

// =========== ORDERS ===========

route.get("/orders", getAllOrders);

// =========== Events ===========

route.post("/addEvent", multerUpload.single("image"), addEvent);

// =========== Stories ===========

route.post(
  "/story",
  multerUpload.single("story"),
  verifyAdminToken,
  admin_stories.addStory
);
route.get("/stories", verifyAdminToken, admin_stories.getStories);

// =========== Channels =========
route.post(
  "/channel",
  multerUpload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  verifyAdminToken,
  admin_stories.addChannel
);


// =========== Custom Meals =================
route.post("/custom", addCustom);
route.get("/custom", getAllCustom);
route.post("/custom/add-to-food", addCustomToFood);


module.exports = route;
