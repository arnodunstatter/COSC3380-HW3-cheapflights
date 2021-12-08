var fs = require("fs");

module.exports = app => {
    app.post('/get-waitlist', async (req, res) => {

        main(req.body.ticket_no);

        async function main(ticket_no) {
            //now we make our client using our creds
            const {
                Client
            } = require('pg');
            const creds = require('../config/creds.json');
            const client = new Client(creds);

            try {
                try {
                    client.connect();

                } catch (e) {
                    console.log("Problem connecting client");
                    throw (e);
                }
                
                await displayWaitList(client, ticket_no);

                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
                console.log("Disconneced");
                console.log("Process ending");
            }

        }

async function displayWaitList(client, ticket_no) {
    async function clientQueryAndWriteToQuerySQL(client, transactionStr)
    {
        fs.appendFileSync("query.sql", transactionStr+"\r", function (err) {
            console.log(err);
        });
        return await client.query(transactionStr);
    }
    fs.appendFileSync("query.sql", `\r\r--The following sql statements are part of the query for displayWaitList(client, ${ticket_no})\r`, function (err) {
        console.log(err);
    });
    var query = await clientQueryAndWriteToQuerySQL(client,
`SELECT book_ref, ticket_no, passport_no, flight_no 
FROM passengers LEFT JOIN tickets USING(passport_no) 
WHERE ticket_no = ${ticket_no}`)
    var flight_no = query.rows[0]["flight_no"];
    console.log(query.rows)


            var economy_waitlist_query = await clientQueryAndWriteToQuerySQL(client,
        `SELECT * 
        FROM economy_waitlist 
        WHERE flight_no = ${flight_no};`);
            var economy_waitlist = economy_waitlist_query.rows;
            console.log(economy_waitlist);

            var business_waitlist_query = await clientQueryAndWriteToQuerySQL(client,
        `SELECT * 
        FROM business_waitlist 
        WHERE flight_no = ${flight_no};`);
            var business_waitlist = business_waitlist_query.rows;
            console.log(business_waitlist);

        }

        // fs.appendFileSync("transaction.sql", " ", function (err) {
        //     console.log(err);
        //   });

        //   fs.appendFileSync("query.sql", " ", function (err) {
        //     console.log(err);
        //   });
    });
};