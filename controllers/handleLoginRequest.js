const e = require("express");
const UserCollection = require("../models/User");
const validateRequest = require("./validateRequest");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleLoginRequest = (req, res) => {
  validateRequest(req, res);

  UserCollection.findOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    function (err, docs) {
      if (err || !docs) {
        return res.status(400).send("user not found");
      } else {
        return res.status(200).send("user login successful");
      }
    }
  );
};

module.exports = handleLoginRequest;
