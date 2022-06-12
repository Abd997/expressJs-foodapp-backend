const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { body } = require("express-validator");
const { NewUserValidation } = require("./validation");
const { handleRegisterRequest } = require("./controllers");

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connected to database");
    },
    (err) => console.log("could not connect to database")
  );

app.post("/register", express.json(), NewUserValidation, handleRegisterRequest);

app.get("*", (req, res) => {
  res.status(404).send("Route not exists");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
