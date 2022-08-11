const e = require("express");
const UserCollection = require("../../collections/User");
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
		const { email, user, explorePostId } = req.body;

		/** @type {Array} */
		let explorePosts = user.savedExplorePosts;
		const postExists = explorePosts.find((e) =>
			e.equals(explorePostId)
		);
		if (!postExists) {
			explorePosts.push(explorePostId);
			await UserCollection.updateOne(
				{ email: email },
				{
					savedExplorePosts: explorePosts
				}
			);
			return res.json({ msg: "Explore post has been saved" });
		} else {
			const ind = explorePosts.findIndex((e) =>
				e.equals(explorePostId)
			);
			explorePosts.splice(ind, 1);
			await UserCollection.updateOne(
				{ email: email },
				{
					savedExplorePosts: explorePosts
				}
			);
			return res.json({ msg: "Explore post has been unsaved" });
		}
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
