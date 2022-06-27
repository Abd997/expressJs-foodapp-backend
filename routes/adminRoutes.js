const { handlePostFood } = require("../controllers");

const route = require("express").Router();

route.post("/add-food", handlePostFood);

module.exports = route;
