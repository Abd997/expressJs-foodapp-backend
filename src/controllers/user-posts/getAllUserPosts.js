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
		let postUser = await UserCollection.find({
			email: email
		});
		if(!postUser) {
			return sendErrorResponse(res, 500, "User not found");
		}
		const user = req.body.loggedInUser;

		const data = await UserPosts.find(
			{ email: email },
			`
		_id
        title 
        email 
        imageUrl 
        description 
        totalLikes
        totalComments 
        dateCreated 
        dateUpdated
      `
		).sort({ dateUpdated: -1 });

		let feedPosts = [];
		for (let i = 0; i < data.length; i++) {
			
			feedPosts.push({
				id: data[i]._id,
				title: data[i].title,
				imageUrl: data[i].imageUrl,
				email: data[i].email,
				totalLikes: data[i].totalLikes,
				totalComments: data[i].totalComments,
				dateCreated: data[i].dateCreated,
				description: data[i].description,
				username: postUser.firstName,
				profileImageUrl: postUser.profileImageUrl
			});
		}
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
