module.exports = app => {
    app.post('/get-waitlist', async (req, res) => {
        console.log(req.body.props.ticketNumber);
        var fs = require("fs");
        main(req.body.props.ticketNumber);
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

            let getFlightNumQuery = `SELECT book_ref, ticket_no, passport_no, flight_no \n
            FROM passengers LEFT JOIN tickets USING(passport_no) WHERE ticket_no = ${ticket_no}`;
            var query = await client.query(getFlightNumQuery)
            var flight_no = query.rows[0]["flight_no"];
            console.log(query.rows)

            fs.appendFileSync("query.sql",
                "\n\rObtain waitlist based on ticket number: \n\n" + getFlightNumQuery + "\r", function (err) {
                    console.log(err);
                });

            let economyWaitlistQuery = `select * from economy_waitlist where flight_no = ${flight_no};`;
            var economy_waitlist_query = await client.query(economyWaitlistQuery);
            var economy_waitlist = economy_waitlist_query.rows;

            fs.appendFileSync("query.sql", economyWaitlistQuery + "\r", function (err) {
                console.log(err);
            });

            let bussinessWaitListQuery = `select * from business_waitlist where flight_no = ${flight_no};`;
            var business_waitlist_query = await client.query(bussinessWaitListQuery);
            
            fs.appendFileSync("query.sql", bussinessWaitListQuery + "\r", function (err) {
                console.log(err);
            });

            var business_waitlist = business_waitlist_query.rows;
            res.json([economy_waitlist, business_waitlist]);

        }
    });
}