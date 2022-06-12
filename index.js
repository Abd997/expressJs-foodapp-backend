require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { NewUserValidation, LoginUserValidation } = require("./validation");
const { handleRegisterRequest, handleLoginRequest } = require("./controllers");

mongoose
  .connect(process.env.DATABASE_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connected to database");
    },
    (err) => console.log("could not connect to database")
  );

app.use(express.json());

app.post("/register", NewUserValidation, handleRegisterRequest);

app.get("/login", LoginUserValidation, handleLoginRequest);

app.get("*", (req, res) => {
  res.status(404).send("Route not exists");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
