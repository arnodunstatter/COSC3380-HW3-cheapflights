module.exports = app => {
    app.post('/search-flight', async (req, res) => {
        main();
        var fs = require("fs");

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
                let distinctCities = await client.query(
                    `select distinct(city_name) from airport_cities;`
                );
                fs.appendFileSync("query.sql",
                    "\n\rPrepopulating city names: \n\n" + "`select distinct(city_name) from airport_cities;`" + "\r", function (err) {
                        console.log(err);
                    });
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

