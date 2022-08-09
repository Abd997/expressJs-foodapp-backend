const axios = require("axios");
const AdminCollection = require("../src/collections/Admin");
require("dotenv").config();
const FoodCollection = require("../src/collections/FoodCollection");
const FoodRepo = require("../src/repo/FoodRepo");

module.exports = async () => {
	// insert an admin
	await AdminCollection.create({
		email: "admin100@gmail.com",
		password: "password"
	});

	const foodNames = [
		"Boulets",
		"Burger",
		"Cake",
		"Chicons au gratin",
		"Fries",
		"Gentse waterzooi",
		"Le filet americain",
		"Paling-in-t-groen",
		"Sole-meunière",
		"Stoofvlees",
		"Stoemp"
	];

	// insert weekly foods
	const startWeek = 28;
	for (var j = 0; j < 8; j++) {
		for (var i = 0; i < 11; i++) {
			var foodName = foodNames[i];
			await FoodCollection.create({
				name: foodName,
				price: "10",
				foodType: "meal",
				imageURL: `${
					process.env.AZURE_CONTAINER_URL
				}/${foodName.replace(" ", "-")}.jpg`,
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
				],
				facts: [
					{
						fact: "Calories",
						value: "300"
					},
					{
						fact: "Fat",
						value: "30g"
					},
					{
						fact: "Protein",
						value: "10g"
					},
					{
						fact: "Carbs",
						value: "30g"
					}
				]
			});
			console.log(`${foodName} inserted for week:${startWeek + j}`);
		}
	}
};
