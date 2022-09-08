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
		
		let postExists = false;
		for(let postids of explorePosts){
			if(postids == explorePostId){
				postExists = true;
			}
		}

		console.log(postExists)
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
			const ind = []
			for(let postids of explorePosts){
				if(postids != explorePostId){
					ind.push(postids);
				}
			}
			await UserCollection.updateOne(
				{ email: email },
				{
					savedExplorePosts: ind
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
