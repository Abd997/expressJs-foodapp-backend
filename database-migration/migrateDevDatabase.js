const axios = require("axios");
const FoodRepo = require("../src/repo/FoodRepo");

module.exports = async () => {
	const foodNames = [
		"cake",
		"burger",
		"fries",
		"stoofvlees",
		"Sole meunière",
		"Chicons au gratin",
		"Filet Americain",
		"Moules frites",
		"Stoemp",
		"Paling in t groen",
		"Gentse waterzooi",
		"Boulets"
	];

	for (var j = 0; j < 8; j++) {
		const startWeek = 26;
		for (var i = 0; i < 7; i++) {
			var foodName = foodNames[Math.floor(Math.random() * 12)];
			await FoodRepo.addFood({
				name: foodName,
				price: "10",
				foodType: "meal",
				weekNumber: startWeek + j,
				tags: [
					{
						text: "PROTEIN",
						color: "orange"
					},
					{
						text: "BREAKFAST",
						color: "purple"
					}
				]
			});
			console.log(`${foodName} inserted for week:${startWeek + j}`);
		}
	}
};
