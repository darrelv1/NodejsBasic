
/*----------
REQUEST DATA
 ----------*/
const https = require("https");
const http = require("http");
const APIKEY = "d03a52b9-0cbe-4a49-9a0d-04bb7db460aa"

function printDefinition (data){

    data['0'].shortdef.map(x => {
    console.dir(`- ${x}`)
    })
}

function getDefinition(TERM) {
    try {
    //API request that outputs the readable stream
    const reponse = https.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${TERM}?key=${APIKEY}`, (request) => {
        if (request.statusCode === 200) {

            let info = ""
            //event of stream on
            request.on('data', (data) => {
                info += data.toString();

            })

            /*----------
            PARSE THE DATA
             ----------*/
            //event when stream has ended
            request.on('end', () => {
                const definition = JSON.parse(info)
                printDefinition(definition)
            })
            //Error address not found// Async Error Handler
            request.on('error', (error) => {
                console.dir(error.message);
            })

        } else {
            const message = `This is your error for ${TERM},  ${http.STATUS_CODES[request.statusCode]}`
            const error1 = new Error(message);
            console.dir(error1)
        }

    })

        } catch(error) {
        console.dir(error.message);
    }

}


const argz = process.argv.slice(2)
argz.forEach(getDefinition)



/*----------
PRINT THE DATA
 ----------*/
