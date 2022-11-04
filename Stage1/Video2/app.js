console.log("Hello world");


function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

function printError(errorObj){
    console.error(`This is your error: ${errorObj}`)
    console.error(` error code : ${errorObj.code}`)
    console.error(`This is your error message: ${errorObj.message}`);
}


// Connect to the API URL
//https://teamtreehouse.com/profiles/csalgado.json
const https = require("https")
const http = require("http")
function getProfile(username) {
    //Try-catch to catch HTTP error ERR_INVALID_URL - would be caught immediately checking before the async code and this a try-block should be used.
    try{
    const request = https.get(
        `https://teamtreehouse.com/profiles/${username}.json`,
        (response) => {
            if (response.statusCode === 200 ){
                let body = "";
                response.on('data', (data) => {
                    body += data.toString();

                })
                response.on('end', ()=> {
                    //Error Try-Catch for errors in parsing due to incorrect links...
                    try {
                        let profile = JSON.parse(body);

                        printMessage(
                            username,
                            profile.badges.length,
                            profile.points.total
                        )


                    } catch (error){
                        printError(error)
                    }

                })
            } else {
                const message = `There was an error getting the profile for ${username} (${response.statusCode})`;
                const StatusCodeError = new Error(message);
                printError(StatusCodeError)
            }
        }
    );
    //Error for address not found // incorrect but valid URL can not be caught by try-catch
    request.on('error', (error) =>{
        printError(error)
    })} catch (error){
        printError(error)
    }
}
//getProfile("darrelvaldiviezo")

//
const names = process.argv.slice(2);
names.forEach( getProfile)
console.dir(names)