var fs = require("fs");
main();

async function main() {
    //now we make our client using our creds
    const { Client } = require('pg');
    const creds = require('./creds.json');
    const client = new Client(creds);

    try {
        try {
            client.connect();

        } catch (e) {
            console.log("Problem connecting client");
            throw (e);
        }

        var numFlights = 2520;
        var flights = [];
        var j = 0; //counter for selecting departure_airport_code
        var d = 0; //counter for adding days to our depart time
        for (let i = 0; i < numFlights; ++i) //TODO change i to 2520 after done troubleshooting
        {
            //for each row in flights we need:
            //departure_gate varchar(3), departure_time timestamptz, departure_airport_code varchar(3), arrival_gate varchar(3), arrival_time timestamptz, 
            //arrival_airport_code varchar(3), baggage_claim varchar(3), aircraft_code varchar(3), available_economy_seats (use subquery), available_business_seats (use subquery)
            var flight = [];
            var gates = ["A01", "A02", "A03", "A04", "A05", "B01", "B02", "B03", "B04", "B05"];
            var airport_codes = ["BKK", "LHR", "JFK", "LAX", "MNL", "IAH", "HND", "GMP", "SEA", "SFO", "MEL", "TPE", "TOJ", "PEK", "SVO"];

            //first select departure_gate
            flight.push(gates[getRandomInt(0, gates.length - 1)]);

            //push departure_time (we'll do all 24 flights from Bangkok, then all 24 flights from London, etc)
            //if i%15 = 0 -> Bangkok, i%15=1 -> London, etc
            //add interval 'i%(24*15) days'
            //add interval 'i%24 hours'
            var departTime = `current_date + interval '7 days' + interval '${d} days' + interval '${i%24} hours'`;
            flight.push(departTime);

            //push departure_airport_code
            var departure_airport_code = airport_codes[j];
            flight.push(departure_airport_code);

            //push arrival_gate
            flight.push(gates[getRandomInt(0, gates.length - 1)]);

            //push arrival_time
            //before we do arrival_time we need to select the arrival_airport_code
            var arrival_airport_code = arrivalAirportCode(departure_airport_code);
            var calculate_flight_time = `SELECT (
                    (SELECT point(longitude,latitude) FROM airport_cities WHERE airport_code = '${departure_airport_code}') <@> 
                    (SELECT point(longitude,latitude) FROM airport_cities WHERE airport_code = '${arrival_airport_code}')
                    ) as distance;` //distance in miles 
            var time_traveled = await client.query(calculate_flight_time);
            time_traveled = time_traveled.rows[0]["distance"];
            time_traveled /= 500;
            flight.push(`CURRENT_DATE + interval '7 days' + interval '${time_traveled} hours'`);

            //push arrival_airport_code
            flight.push(arrival_airport_code);

            //push baggage_claim
            var baggage_claim_carousel = ["Y01", "Y02", "Y03", "Y04", "Y05", "Z01", "Z02", "Z03", "Z04", "Z05"];
            flight.push(baggage_claim_carousel[getRandomInt(0, baggage_claim_carousel.length - 1)]);

            //push aircraft_code
            var aircraft_codes = ["AB6", "312", "388", "345", "7MJ", "741", "779", "722", "773", "320"];
            var aircraft_code = aircraft_codes[getRandomInt(0, aircraft_codes.length - 1)];
            flight.push(aircraft_code);

            //push available_economy_seats (use subquery)
            var economy_seats = `SELECT total_economy_seats FROM aircraft WHERE aircraft_code = '${aircraft_code}'`;
            economy_seats = await client.query(economy_seats);
            economy_seats = economy_seats.rows[0]["total_economy_seats"];
            flight.push(economy_seats);

            //available_business_seats (use subquery)
            var business_seats = `SELECT total_business_seats FROM aircraft WHERE aircraft_code = '${aircraft_code}'`;
            business_seats = await client.query(business_seats);
            business_seats = business_seats.rows[0]["total_business_seats"];
            flight.push(business_seats);


            flights.push(flight);

            // console.log(`INSERT INTO flights (departure_gate, departure_time ,departure_airport_code,arrival_gate,arrival_time,arrival_airport_code,baggage_claim,aircraft_code,available_economy_seats,available_business_seats)
            // VALUES ('${flights[i][0]}', ${flights[i][1]}, '${flights[i][2]}','${flights[i][3]}',${flights[i][4]},'${flights[i][5]}','${flights[i][6]}','${flights[i][7]}',${flights[i][8]},${flights[i][9]});`);
            // console.log("j:",j," gave departure_airport_code:",departure_airport_code);
            await client.query(
                `INSERT INTO flights (departure_gate,departure_time ,departure_airport_code,arrival_gate,arrival_time,arrival_airport_code,baggage_claim,aircraft_code,available_economy_seats,available_business_seats)
                VALUES ('${flights[i][0]}', ${flights[i][1]}, '${flights[i][2]}','${flights[i][3]}',${flights[i][4]},'${flights[i][5]}','${flights[i][6]}','${flights[i][7]}',${flights[i][8]},${flights[i][9]});`
            );

            if (i != 0 && i % 15 == 0)
                ++j; //used for selecting departure airport
            if (j == airport_codes.length) j = 0; //used to reset the departure_airport_code when we've exh
            if (i != 0 && i % 360 == 0) ++d; //used for adding days to our departure time
        }

        // for (let i = 0; i < numFlights; ++i) {
        //     await client.query(
        //         `INSERT INTO flights (departure_gate,departure_time ,departure_airport_code,arrival_gate,arrival_time,arrival_airport_code,baggage_claim,aircraft_code,available_economy_seats,available_business_seats)
        //         VALUES ('${flights[i][0]}', ${flights[i][1]}, '${flights[i][2]}','${flights[i][3]}',${flights[i][4]},'${flights[i][5]}','${flights[i][6]}','${flights[i][7]}',${flights[i][8]},${flights[i][9]});`
        //     );
        // }


        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function arrivalAirportCode(departure_airport_code) {
    var airport_codes = ["BKK", "LHR", "JFK", "LAX", "MNL", "IAH", "HND", "GMP", "SEA", "SFO", "MEL", "TPE", "TOJ", "PEK", "MEX"];
    var arrival_airport_code = airport_codes[getRandomInt(0, airport_codes.length - 1)];
    while (arrival_airport_code == departure_airport_code)
        arrival_airport_code = airport_codes[getRandomInt(0, airport_codes.length - 1)];
    return arrival_airport_code;
}