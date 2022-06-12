const e = require("express");
const { validationResult } = require("express-validator");
const UserCollection = require("../models/User");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleLoginRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
