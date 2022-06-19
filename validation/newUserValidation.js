const { body } = require("express-validator");
const UserCollection = require("../models/User");

module.exports = [
  body("email").isEmail(),
  body("email").custom((value) => {
    return UserCollection.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  body("firstName").exists({ checkFalsy: true }),
  body("lastName").exists({ checkFalsy: true }),
  body("password").exists({ checkFalsy: true }),
];
