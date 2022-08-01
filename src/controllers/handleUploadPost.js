const e = require("express");
const UserCollection = require("../models/User");
const UserPosts = require("../models/UserPosts");
const uploadToAzure = require("../utils/uploadToAzure");

/**
 *
 * @param {e.Request} req
 */
async function savePostToDatabase(req) {
  const doc = await UserCollection.findOne({ email: req.body.email });
  if (!doc) {
    return res.status(400).send({ error: "User not found" });
  }
  /** @type {Array<number>} */
  const postIds = doc.postIds;
  const newPost = await UserPosts.create({
    email: req.body.email,
    imageFileName: req.file.filename,
    description: req.body.description,
    title: req.body.title,
  });
  postIds.push(newPost._id);

  await UserCollection.updateOne(
    { email: req.body.email },
    {
      postIds: postIds,
    }
  );
}

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
  await uploadToAzure(req);
  await savePostToDatabase(req);
  res.json({ msg: "Post uploaded successfully" });
};
