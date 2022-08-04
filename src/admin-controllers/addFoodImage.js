const e = require("express");
const FoodCollection = require("../collections/FoodCollection");
const sendErrorResponse = require("../utils/sendErrorResponse");
const uploadToAzure = require("../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 */
const validate = (req) => {
  const { foodName } = req.body;
  if (!foodName) {
    throw new Error("Food name not sent");
  }
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
  try {
    await validate(req);
    let { foodName } = req.body;
    await uploadToAzure(req);
    foodName = foodName.replaceAll("-", " ");
    await FoodCollection.updateMany(
      { name: foodName },
      {
        imageURL:
          "https://foodappstorageaccount.blob.core.windows.net/container/" +
          req.file.filename,
      }
    );
    res.json({
      msg: "Food image added",
    });
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};
