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




        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

//already inserted ticket_no, flight_no, gate_no, baggage_claim, baggage_id
`SELECT COUNT(*)
    FROM BOARDING PASSES
    WHERE flight_no = ${flight_no} AND
        SEAT_NO ILIKE '${first_letter_of_seatClass}%';` + 1
`SELECT COUNT(*)
    FROM boarding_passes
    WHERE flight_no = ${flight_no};` = boarding_no
