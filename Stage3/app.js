const https = require("https");
const http = require("http");

// Print the data
function printMessage(username, badgeCount, points) {
	const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
	console.log(message);
}
function printError(error) {
	console.error(error.message);
}

function getProfile(username) {
	try {
		// Connect to the API URL (https://teamtreehouse.com/csalgado.json)
		const request = https.get(
			`https://teamtreehouse.com/${username}.json`,
			(response) => {
				if (response.statusCode == 200) {
					let body = "";
					// Read the data
					response.on("data", (data) => {
						body += data.toString();
					});
					response.on("end", () => {
						try {
							// Parse the data
							let profile = JSON.parse(body);

							printMessage(
								username,
								profile.badges.length,
								profile.points.JavaScript
							);
						} catch (error) {
							printError(error);
						}
					});
				} else {
					const message = `There was an error getting the profile for ${username} (${
						http.STATUS_CODES[response.statusCode]
					})`;
					const statusCodeError = new Error(message);
					printError(statusCodeError);
				}
			}
		);
		request.on("error", (error) => printError(error));
	} catch (error) {
		printError(error);
	}
}
const users = process.argv.slice(2);
users.forEach(getProfile);
