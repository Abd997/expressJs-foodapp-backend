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
		let user_details = await UserCollection.findOne({ email: email });
		
		let postExists = false;
		for(let postids of user_details.savedExplorePosts){
			if(postids == explorePostId){
				postExists = true;
			}
		}

		console.log(postExists)
		if (!postExists) {
			user_details.savedExplorePosts.push(explorePostId);
			await user_details.save();
			return res.json({ msg: "Explore post has been saved" });
		} else {
			const ind = []
			for(let postids of user_details.savedExplorePosts){
				if(postids != explorePostId){
					ind.push(postids);
				}
			}
			user_details.savedExplorePosts = ind;
			await user_details.save();
			return res.json({ msg: "Explore post has been unsaved" });
		}
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
