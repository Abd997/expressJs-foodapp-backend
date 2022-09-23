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
		const user = req.body.loggedInUser
		const feedPosts = await UserPosts.find(
			{ email: email },
			"_id email imageUrl totalLikes totalComments dateUpdated userProfileImage firstName"
		);
		let likedPosts = []
		for(let post of feedPosts){
			if(user.likedPosts.includes(post.id)){
				likedPosts.push({post,isLiked:true})
			}else{
				likedPosts.push({post,isLiked:false})
			}
		}
		return res.json({
			posts: likedPosts
		});
	} catch (e) {
		sendErrorResponse(res, 500, e.message);
	}
};
