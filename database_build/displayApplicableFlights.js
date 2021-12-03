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

        await findFlights(client, "2021-12-01", "Houston", "Madrid");


        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}


async function findFlights(client, departure_date, departure_city, arrival_city) {
    var applicableFlights = []; //applicablFlights = [ [directFlight1], [directFlight2], [ Flight1,Flight2 ] ]
    async function clientQueryAndWriteToQuerySQL(client, transactionStr)
    {
        fs.appendFileSync("query.sql", transactionStr+"\r", function (err) {
            console.log(err);
        });
        return await client.query(transactionStr);
    }

    fs.appendFileSync("query.sql", `\r\r--The following sql statements are part of the query for findFlights(client, ${departure_date}, ${departure_city}, ${arrival_city})\r`, function (err) {
        console.log(err);
    });
    //get departureAirportCode 
    var departureAirportCode = await clientQueryAndWriteToQuerySQL(client,
`SELECT airport_code
FROM airport_cities
WHERE city_name = '${departure_city}';`
    );

    departureAirportCode = departureAirportCode.rows[0]["airport_code"];
    //get arrivalAirportCode
    var arrivalAirportCode = await clientQueryAndWriteToQuerySQL(client,
`SELECT airport_code
FROM airport_cities
WHERE city_name = '${arrival_city}';`
    );

    arrivalAirportCode = arrivalAirportCode.rows[0]["airport_code"];

    var directFlights = await clientQueryAndWriteToQuerySQL(client,
`SELECT flight_no
FROM flights
WHERE departure_airport_code = '${departureAirportCode}' 
    AND arrival_airport_code = '${arrivalAirportCode}' 
    AND DATE(departure_time) = '${departure_date}';`
    );

    directFlights = directFlights.rows;
    //convert from array of maps to array of arrays
    for (let i = 0; i < directFlights.length; ++i)
        directFlights[i] = Object.values(directFlights[i]);
    //push into applicableFlights and package each flight into an internal array for consistent formatting of applicableFlights
    // i.e. applicableFlights = [ [directFlights1], [directFlights2], [ Flight1,Flight2 ] ]
    for (let i = 0; i < directFlights.length; ++i)
        applicableFlights.push([directFlights[i]]);


    var connectingFlights = await clientQueryAndWriteToQuerySQL(client,
`SELECT f1.flight_no AS flight_no_1, f2.flight_no AS flight_no_2
FROM flights AS f1
JOIN flights AS f2
    ON f1.arrival_airport_code = f2.departure_airport_code
WHERE f2.departure_time > f1.arrival_time 
    AND f1.departure_airport_code = '${departureAirportCode}' 
    AND f2.arrival_airport_code = '${arrivalAirportCode}' 
    AND DATE(f1.departure_time) = '${departure_date}'
    ORDER BY f2.departure_time ASC
    LIMIT 20;`
    );


    connectingFlights = connectingFlights.rows;
    //convert from array of maps to array of arrays
    for (let i = 0; i < connectingFlights.length; ++i)
        connectingFlights[i] = Object.values(connectingFlights[i]);
    //push into applicableFlights
    for (let i = 0; i < connectingFlights.length; ++i)
        applicableFlights.push(connectingFlights[i]);

    return applicableFlights; //when flight details are needed, they can be retrieved using the flight_no's in this array

    //departure time, arrival time, how many stops there are, (where the stop is) and then total booking price before tax 
    //(if not same for everything it would be based on time, less time obvsly more costly, subtract money based on the amount of stops (aka more stops = cheaper))
    //and total time span of the whole booking
    //time between last arrival and first departure
}


// SELECT f1.flight_no AS flight_no_1, f2.flight_no AS flight_no_2
//         FROM flights AS f1
//         JOIN flights AS f2
//             ON f1.arrival_airport_code = f2.departure_airport_code
//         WHERE f2.departure_time > f1.arrival_time AND
//             f1.departure_airport_code = 'IAH' AND
//             f2.arrival_airport_code = 'TOJ' AND
//             DATE(f1.departure_time) = '2021-12-01'
//         ORDER BY f2.departure_time ASC
//         LIMIT 20