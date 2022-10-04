const e = require("express");
const ExplorePostCollection = require("../../collections/ExplorePost");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const savedExplorePosts = req.body.user.savedExplorePosts;
        const tags = req.query.tags.split(',');
		const posts = await ExplorePostCollection.find({
            tags: {$elemMatch:{$in: tags}},
        })
		
		let savedPosts = [];
		for(let post of posts){
			if(savedExplorePosts.includes(post._id)){
				savedPosts.push({post,isSaved:true})
			}
			else{ 
				savedPosts.push({post,isSaved:false})
			}
		}
		return res.json({
			posts: savedPosts
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
