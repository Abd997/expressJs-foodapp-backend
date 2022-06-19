const e = require("express");
const jwt = require("jsonwebtoken");
const UserCollection = require("../models/User");
const validateRequest = require("./validateRequest");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleLoginRequest = async (req, res) => {
  validateRequest(req, res);

  const doc = await UserCollection.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  // console.log(doc);
  if (!doc) {
    return res.status(400).send("user not found");
  }

  const token = await jwt.sign({ doc }, "secretkey");

  return res.json({
    token,
  });
};

module.exports = handleLoginRequest;
