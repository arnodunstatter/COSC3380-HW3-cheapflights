var fs = require("fs");
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

        var ticket_no = "1";
        await displayWaitList(client, ticket_no);




        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

async function displayWaitList(client, ticket_no) {

    var query = await client.query(`SELECT book_ref, ticket_no, passport_no, flight_no FROM passengers LEFT JOIN tickets USING(passport_no) WHERE ticket_no = ${ticket_no}`)
    var flight_no = query.rows[0]["flight_no"];
    console.log(query.rows)


    var economy_waitlist_query = await client.query(`select * from economy_waitlist where flight_no = ${flight_no};`);
    var economy_waitlist = economy_waitlist_query.rows;
    console.log(economy_waitlist);

    var business_waitlist_query = await client.query(`select * from business_waitlist where flight_no = ${flight_no};`);
    var business_waitlist = business_waitlist_query.rows;
    console.log(business_waitlist);

}

// fs.appendFileSync("transaction.sql", " ", function (err) {
//     console.log(err);
//   });

//   fs.appendFileSync("query.sql", " ", function (err) {
//     console.log(err);
//   });