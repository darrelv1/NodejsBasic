//Require https module
const https = require("https");

function getDef(term) {
	try {
		//request data
		const request = https.get(
			`https://dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=267fc1f6-64b2-4cba-b6ec-308de21c2a6b`,
			(response) => {
				let body = "";
				// Read the data
				response.on("data", (data) => {
					body += data.toString();
				});

				response.on("end", () => {
					// Parse the data
					const definition = JSON.parse(body);
					// Print the data
					console.log(definition[0].shortdef);
				});
			}
		);
		request.on("error", (error) => console.error(error.message));
	} catch (error) {
		console.error(error.message);
	}
}

const query = process.argv.slice(2);
query.forEach(getDef);
