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

        var queryStr = "SELECT * FROM table_name;";
        await client.query(queryStr);


        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

// fs.appendFileSync("transaction.sql", " ", function (err) {
//     console.log(err);
//   });

//   fs.appendFileSync("query.sql", " ", function (err) {
//     console.log(err);
//   });