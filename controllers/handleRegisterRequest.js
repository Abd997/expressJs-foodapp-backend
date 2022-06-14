const e = require("express");
const UserCollection = require("../models/User");
const validateRequest = require("./validateRequest");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleRegisterRequest = (req, res) => {
  validateRequest(req, res);

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
  };

  UserCollection.create(data, function (err, result) {
    if (err) {
      // console.log("could not add user");
      return res.send("could not add user");
    } else {
      // console.log(result);
      return res.send("New user has been added successfully");
    }
  });
  // return res.send("New user has been added successfully");
};

module.exports = handleRegisterRequest;
