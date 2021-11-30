main();

async function main() {
    //now we make our client using our creds
    const {
        Client
    } = require('pg');
    const creds = require('./creds.json');
    const client = new Client(creds);

    try {
        try {
            client.connect();

        } catch (e) {
            console.log("Problem connecting client");
            throw (e);
        }
        //say someone has already checked in and been given their boarding_pass
        var queryStr = "SELECT *\rFROM table_name;\r\r";
        await client.query(queryStr);
        fs.appendFileSync("query.sql", queryStr, function (err) {
            console.log(err);
        });

        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}