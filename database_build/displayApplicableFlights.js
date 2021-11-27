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


async function findFlights(client, departure_date, departure_city, arrival_city)
{
    var limitOfConnections = 1;

    //get departureAirportCode 
    var departureAirportCode = await client.query(
        `SELECT airport_code
            FROM airport_cities
            WHERE city_name = '${departure_city}';`
    );
    departureAirportCode = departureAirportCode.rows[0]["airport_code"];
    //get arrivalAirportCode
    var arrivalAirportCode = await client.query(
        `SELECT airport_code
            FROM airport_cities
            WHERE city_name = '${arrival_city}';`
    );
    arrivalAirportCode = arrivalAirportCode.rows[0]["airport_code"];
    
    var directFlights = await client.query(
        `SELECT *
            FROM flights
            WHERE departure_airport_code = '${departureAirportCode}' AND 
                arrival_airport_code = '${arrivalAirportCode}' AND 
                DATE(departure_time) = '${departure_date}';`
    );

    directFlights = directFlights.rows;
    console.log(directFlights);
    
}
https://stackoverflow.com/questions/56795743/how-to-convert-map-to-array-of-object/56795800

applicableFlights = [[directFlights1],[directFlights2], [ [Flight1],[Flight2] ] ]