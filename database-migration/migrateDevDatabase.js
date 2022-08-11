const axios = require("axios");
const AdminCollection = require("../src/collections/Admin");
const ExplorePostCollection = require("../src/collections/ExplorePost");
require("dotenv").config();
const FoodCollection = require("../src/collections/FoodCollection");
const GroceryCollection = require("../src/collections/GroceryCollection");
const UserCollection = require("../src/collections/User");
const FoodRepo = require("../src/repo/FoodRepo");

module.exports = async () => {
	// insert admin
	await AdminCollection.create({
		email: "admin100@gmail.com",
		password: "password"
	});
	console.log("Admin added");

	// insert users
	await UserCollection.create({
		email: "user100@gmail.com",
		firstName: "user",
		lastName: "100",
		password: "password"
	});
	console.log("User added");

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
	const startWeek = 31;
	for (var j = 0; j < 2; j++) {
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

	// insert groceries
	const groceries = [
		"bread",
		"butter",
		"pasta",
		"rice",
		"vegetable oil"
	];
	for (let i = 0; i < groceries.length; i++) {
		await GroceryCollection.create({
			name: groceries[i],
			price: 11,
			priceInCents: 11_000
		});
		console.log(`Grocery ${groceries[i]} inserted`);
	}

	const types = ["deals", "blogs", "recipes"];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 10; j++) {
			await ExplorePostCollection.create({
				postType: types[i],
				title: foodNames[j],
				imageUrl: `${
					process.env.AZURE_CONTAINER_URL
				}/${foodName.replace(" ", "-")}.jpg`
			});
		}
	}
};
