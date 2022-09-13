const e = require("express");
const UserCollection = require("../../collections/User");
const UserPosts = require("../../collections/UserPosts");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => { };

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { user, email } = req.body;
		const result = await UserCollection.find({ email: email }).select("savedExplorePosts").populate("savedExplorePosts")
		let savedPosts = [];
		for(let post of result[0]["savedExplorePosts"]){
				savedPosts.push({post,isSaved:true})
		}
		return res.json({ posts: savedPosts });
	} catch (error) {
		return sendErrorResponse(res, 500, error.message);
	}
};
