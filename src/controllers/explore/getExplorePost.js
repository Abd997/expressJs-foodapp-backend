const e = require("express");
const ExplorePostCollection = require("../../collections/ExplorePost");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { type } = req.params;
	// const valid = ["deals", "blogs", "recipes"].find((e) => e === type);
	if (!type) {
		throw new BadRequestError("Explore post type is not valid");
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
		const savedExplorePosts = req.body.user.savedExplorePosts;
		const { type } = req.params;
		console.log(type)
		
		const posts = await ExplorePostCollection.find({ postType: { $regex: type, $options: "i" }});
		let savedPosts = [];
		for(let post of posts){
			if(savedExplorePosts.includes(post._id)){
				savedPosts.push({post,isSaved:true})
			}
			else{ 
				savedPosts.push({post,isSaved:false})
			}
		}
		res.json({
			posts: savedPosts
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
