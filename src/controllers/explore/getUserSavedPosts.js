const e = require("express");
const UserPosts = require("../../collections/UserPosts");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { user, email } = req.body;
		/** @type {Array} */
		const savedExplorePosts = user.savedExplorePosts;
		if (savedExplorePosts.length === 0 || !savedExplorePosts) {
			throw new BadRequestError("User does not have any saved posts");
		}
		const posts = [];
		for (let i = 0; i < savedExplorePosts.length; i++) {
			let post = await UserPosts.findById(savedExplorePosts[i]);
			if (post) {
				posts.push(post);
			}
		}
		return res.json({
			posts: posts
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
