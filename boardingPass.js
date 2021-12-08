module.exports = app => {
    app.post('/boarding-pass', async(req, res) => {
        const fs = require('fs');
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

                await getBoardingPass(client, ticket_no); 

                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
                console.log("Disconneced");
                console.log("Process ending");
            }
        }

        //**generate boarding_pass */
        async function getBoardingPass(client, ticket_no) {


            try {

                async function clientQueryAndWriteToQuerySQL(client, transactionStr)
                {
                    fs.appendFileSync("./Client/public/query.sql", transactionStr+`\r\r--The following sql statements are part of the query for for getBoardingPass(client,${ticket_no})\r`, function (err) {
                        console.log(err);
                    });
                    return await client.query(transactionStr);
                }

                var boarding_pass_query = await clientQueryAndWriteToQuerySQL(client,
`SELECT *
FROM boarding_passes
WHERE ticket_no = ${ticket_no};`);

                res.json(boarding_pass_query.rows);



            } catch (e) {
                
                
                throw (e); //will bypass the "Ending Correctly" throw
            }
        }
    });
}