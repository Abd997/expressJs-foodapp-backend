const express = require("express");
const addFoodImage = require("../admin-controllers/addFoodImage");
const addWeeklyFoods = require("../admin/add-weekly-foods");
const multerUpload = require("../utils/multerUpload");
const verifyAdminToken = require("../utils/verifyAdminToken");
const route = express();

route.post(
  "/add/weeklyfoods",
  addWeeklyFoods.validateReq,
  verifyAdminToken,
  addWeeklyFoods.handler
);

route.post(
  "/add/food-image",
  // verifyAdminToken,
  multerUpload.single("image"),
  addFoodImage
);

module.exports = route;
