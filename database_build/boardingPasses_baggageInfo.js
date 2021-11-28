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

        //**user clicks check-in button, prompt user for number of bags, and then generate boarding passes after they input # of bags*/
        var number_of_bags = 2;
        var ticket_no = 4;

        var baggage_id = await makeBaggageInfo(client, number_of_bags); //user enters number_of_bags, only 0, 1, 2 number of bags allowed
        await makeBoardingPasses(client, ticket_no, baggage_id); //user checks-in, generate boarding passes


        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }
}


//**generate boarding_pass */
async function makeBoardingPasses(client, ticket_no, baggage_id) {
    try {

        await client.query("BEGIN;"); //start our transaction

        //1: ticket_no given (skipped)

        //2: get flight_no from flights table
        var flight_no_query = await client.query(`SELECT flight_no FROM tickets WHERE ticket_no = ${ticket_no};`);
        var flight_no = flight_no_query.rows[0]["flight_no"];

        //3: get seat_no
        var seat_no_query = await client.query(`SELECT COUNT(seat_class)+1 AS count
                                                FROM tickets 
                                                WHERE flight_no = ${flight_no} AND seat_class LIKE 'e%';`)


        //4: get boarding_no

        //5 & 6: get departing gate_no & baggage_claim
        var gate_no_baggage_claim_query = await client.query(`SELECT departure_gate, baggage_claim FROM flights WHERE flight_no = ${flight_no};`);
        var gate_no = gate_no_baggage_claim_query.rows[0]["departure_gate"]
        var baggage_claim = gate_no_baggage_claim_query.rows[0]["baggage_claim"]

        //7: baggage_id given (skipped)

        await client.query(`INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
                            VALUES(${ticket_no}, ${flight_no}, '${seat_no}','${boarding_no}','${gate_no}','${baggage_claim}',${baggage_id})`);

        //la fin 
        await client.query("COMMIT;");
    } catch (e) {
        await client.query("ROLLBACK;");
        throw (e); //will bypass the "Ending Correctly" throw
    }
}

//**constraint set on number_of_bags during CREATE TABLE */
//**CONSTRAINT (number_of_bags > -1 AND number_of_bags < 3)  */
async function makeBaggageInfo(client, number_of_bags) {
    try {

        await client.query("BEGIN;"); //start our transaction

        await client.query(`INSERT INTO baggage_info(number_of_bags) VALUES(${number_of_bags})`);


        var baggage_id = await client.query(`SELECT baggage_id from baggage_info ORDER BY baggage_id DESC LIMIT 1;`); //get baggage_id

        await client.query("COMMIT;");
        return Object.values(baggage_id.rows[0]); //return newest baggage_id

    } catch (e) {
        await client.query("ROLLBACK;");
        throw (e); //will bypass the "Ending Correctly" throw
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

    SELECT COUNT(seat_class)+'E' +1 AS count
    FROM tickets 
    WHERE flight_no = 4920 AND seat_class LIKE 'e%';