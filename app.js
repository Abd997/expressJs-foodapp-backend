const express = require("express");
const app = express();
const {
  NewUserValidation,
  LoginUserValidation,
  ExtraDetailsValidation,
} = require("./validation");
const {
  handleRegisterRequest,
  handleLoginRequest,
  handleExtraDetailsRequest,
} = require("./controllers");

app.use(express.json());

app.post("/register", NewUserValidation, handleRegisterRequest);

app.post(
  "/register-extra-details",
  ExtraDetailsValidation,
  handleExtraDetailsRequest
);

app.get("/discover-deals", handle);

app.get("/login", LoginUserValidation, handleLoginRequest);

app.get("*", (req, res) => {
  res.status(404).send("Route not exists");
});

module.exports = app;
