const e = require("express");
const validateRequest = require("./validateRequest");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
const handleExtraDetailsRequest = (req, res) => {
  validateRequest(req, res);
  res.send("working");
};

module.exports = handleExtraDetailsRequest;
