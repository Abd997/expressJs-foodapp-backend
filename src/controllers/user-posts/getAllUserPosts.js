const sendErrorResponse = require("../../utils/sendErrorResponse");
const UserCollection = require("../../collections/User");
const PostCollection = require("../../collections/UserPosts");
const UserPosts = require("../../collections/UserPosts");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email } = req.body;
		const posts = await UserPosts.find(
			{ email: email },
			"_id email imageUrl totalLikes totalComments dateUpdated profileImageUrl"
		);
		return res.json({
			posts: posts
		});
	} catch (e) {
		sendErrorResponse(res, 500, e.message);
	}
};
