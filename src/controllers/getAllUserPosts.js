const sendErrorResponse = require("../utils/sendErrorResponse");
const UserCollection = require("../collections/User");
const PostCollection = require("../collections/UserPosts");

/**
 *
 * @param {e.Request} req
 * @returns {Promise<void>}
 */
async function validate(req) {
  const email = req.params.email;
  if (!email) {
    throw new Error("Email not sent");
  }
}

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<e.Response>}
 */
module.exports = async (req, res) => {
  try {
    await validate(req);
    const email = req.params.email;
    const user = await UserCollection.findOne({ email: email });
    const postIds = user.postIds;
    const posts = [];
    for (let i = 0; i < postIds.length; i++) {
      let post = await PostCollection.findOne({ _id: postIds.at(i) });
      posts.push(post);
    }
    return res.json({
      posts: posts,
    });
  } catch (e) {
    sendErrorResponse(res, 500, e.message);
  }
};
