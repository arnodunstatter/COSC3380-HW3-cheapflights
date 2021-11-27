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
        
        // var directFlights = await client.query(
        //     `SELECT *
        //         FROM flights
        //         WHERE departure_airport_code = '${departureAirportCode}' AND 
        //             arrival_airport_code = '${arrivalAirportCode}' AND 
        //             DATE(departure_time) = '${departure_date}';`
        
        var flights = await client.query(
            `SELECT * FROM flights LIMIT 10;`
        );
        flights=flights.rows;
        console.log("Array of maps:");
        console.log(flights);
        for(let i = 0; i < flights.length;++i)
            flights[i] = Object.values(flights[i])
            console.log(Object.values(flights[i]))
        console.log("Array of arrays?");
        console.log(flights);

        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}