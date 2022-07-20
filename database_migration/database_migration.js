const axios = require("axios");
const { join } = require("../validation/newUserValidation");

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

const p = "https://food-app-backend.azurewebsites.net/admin/add-food";
const l = "http://localhost:8080/admin/add-food";

const migrate = async () => {
	for (var j = 0; j < 5; j++) {
		for (var i = 0; i < 7; i++) {
			var foodName = foodNames[Math.floor(Math.random() * 12)];
			try {
				await axios.post(l, {
					name: foodName,
					price: "10",
					foodType: "meal",
					weekNumber: 24 + j,
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
				console.log(`${foodName} for week:${26 + j}`);
			} catch (err) {
				console.log(err);
			}
		}
	}
};

// const migrateImages = async () => {
// 	for (var i = 0; i < 12; i++) {
// 		var foodName = i;
// 		try {
// 			await axios.post(
// 				"https://food-app-backend.azurewebsites.net/admin/add-food",

// 			console.log(`${foodName} for week:${26 + j}`);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// };

migrate();
