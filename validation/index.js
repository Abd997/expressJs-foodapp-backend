module.exports = {
	newUserValidation: require("../src/user-register/validateRequest"),
	loginUserValidation: require("../src/user-login/validateRequest"),
	extraDetailsValidation: require("./extraDetailsValidation"),
	getStoryValidation: require("./getStoryValidation"),
	authRequestValidation: require("./authRequestValidation"),
	validatePostFoodImageReq: require("./validatePostFoodImageReq")
};
