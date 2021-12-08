module.exports = app => {
    app.post('/search-flight', async (req, res) => {
        const fs = require('fs');
        main();

        async function main() {
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
                await fetchCities(client);

                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
            }
        }


        async function fetchCities(client) {
            try {
                async function clientQueryAndWriteToQuerySQL(client, transactionStr)
                {
                    fs.appendFileSync("query.sql", transactionStr+"\r", function (err) {
                        console.log(err);
                    });
                    return await client.query(transactionStr);
                }
                fs.appendFileSync("query.sql", `\r\r--The following sql statements are part of the query for fetchCities(client)\r`, function (err) {
                    console.log(err);
                });
                let distinctCities = await clientQueryAndWriteToQuerySQL(client,
`SELECT DISTINCT(city_name) 
FROM airport_cities;`
                );
                distinctCities = await distinctCities.rows;

                
                for (let i = 0; i < distinctCities.length; ++i)
                    distinctCities[i] = Object.values(distinctCities[i])[0];
                res.json(distinctCities);
            } catch (e) {
                console.log(e); //will bypass the "Ending Correctly" throw
            }

        }


    });
};

