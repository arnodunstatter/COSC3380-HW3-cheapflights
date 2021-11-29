main();

async function main() {
    //now we make our client using our creds
    const { Client } = require('pg');
    const creds = require('./creds.json');
    const client = new Client(creds);

    try {
        try {
            client.connect();

        } catch (e) {
            console.log("Problem connecting client");
            throw (e);
        }

        var result = await client.query("SELECT first_name FROM passengers WHERE first_name = 'Arno';");
        if (result.rows[0] == undefined)
            console.log("yup");
        else
        {
            var first_name = result.rows[0]["first_name"];
            console.log(first_name);
        }


        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}