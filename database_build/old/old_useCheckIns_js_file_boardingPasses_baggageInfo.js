var fs = require("fs");
main();

async function main() {
    //now we make our client using our creds
    const {
        Client
    } = require('pg');
    const creds = require('../creds.json');
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
        var ticket_no = 45;

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
        fs.appendFileSync("transaction.sql", "//Begin transaction for populating boarding_passes table//\r\rBEGIN;\r\r", function (err) {
            console.log(err);
        });
        //1: ticket_no given (skipped)

        //2: get flight_no from flights table
        var flight_no_query = await client.query(`SELECT flight_no\rFROM tickets\rWHERE ticket_no = ${ticket_no};\r\r`);
        fs.appendFileSync("transaction.sql", "//Get flight_no//\r\r" + flight_no_query, function (err) {
            console.log(err);
        });
        var flight_no = flight_no_query.rows[0]["flight_no"];


        //3: get seat_no by first determining seat_class
        var seat_class_query = await client.query(`SELECT seat_class\rFROM tickets\rWHERE ticket_no = ${ticket_no};\r\r`);
        fs.appendFileSync("transaction.sql", "//Get seat_class//\r\r" + seat_class_query, function (err) {
            console.log(err);
        });
        var seat_class = seat_class_query.rows[0]["seat_class"];


        //3.1: get economy_seat_no
        if (seat_class == "economy") {

            var e_seat_no_query = await client.query(`SELECT COUNT(*)+1\r
                                                FROM boarding_passes\r
                                                LEFT JOIN tickets USING(ticket_no)\r
                                                WHERE tickets.flight_no = ${flight_no}\rAND seat_class = '${seat_class}'\r\r;`);
            fs.appendFileSync("transaction.sql", "//Get economy_seat_no//\r\r" + e_seat_no_query, function (err) {
                console.log(err);
            });
            var e_seat_position = e_seat_no_query.rows[0]["?column?"];
            console.log(e_seat_position)

            if (e_seat_position > 10) {
                throw ("Economy Seats Full at 10");
            }
            var e_seat_no = await client.query(`SELECT CONCAT('E', ${e_seat_position});\r\r`)
            fs.appendFileSync("transaction.sql", "//Concat economy_seat_no with class_letter//\r\r" + e_seat_no, function (err) {
                console.log(err);
            });
            var e_seat_no = e_seat_no.rows[0]["concat"];
            var seat_no = e_seat_no;


            //3.2: get business_seat_no
        } else if (seat_class == "business") {

            var b_seat_no_query = await client.query(`SELECT COUNT(*)+1\r
                                                FROM boarding_passes\r
                                                LEFT JOIN tickets USING(ticket_no)\r
                                                WHERE tickets.flight_no = ${flight_no}\rAND seat_class = '${seat_class}';\r\r`);
            fs.appendFileSync("transaction.sql", "//Get business_seat_no//\r\r" + b_seat_no_query, function (err) {
                console.log(err);
            });
            var b_seat_position = b_seat_no_query.rows[0]["?column?"];
            console.log(b_seat_position)

            if (b_seat_position > 10) {
                throw ("Business Seats Full at 10")
            }
            var b_seat_no = await client.query(`SELECT CONCAT('B', ${b_seat_position});\r\r`);
            fs.appendFileSync("transaction.sql", "//Concat business_seat_no with class_letter//\r\r" + b_seat_no, function (err) {
                console.log(err);
            });
            var b_seat_no = b_seat_no.rows[0]["concat"];
            var seat_no = b_seat_no;

        }

        //4: get boarding_no
        var boarding_no_query = await client.query(`SELECT COUNT(*)+1\rFROM boarding_passes\rWHERE flight_no = ${flight_no};\r\r`);
        fs.appendFileSync("transaction.sql", "//Get boarding_no//\r\r" + boarding_no_query, function (err) {
            console.log(err);
        });
        var boarding_no = boarding_no_query.rows[0]["?column?"]


        //5 & 6: get departing gate_no & baggage_claim
        var gate_no_baggage_claim_query = await client.query(`SELECT departure_gate, baggage_claim\rFROM flights\rWHERE flight_no = ${flight_no};\r\r`);
        fs.appendFileSync("transaction.sql", "//Get departing_gate & baggage_claim//\r\r" + gate_no_baggage_claim_query, function (err) {
            console.log(err);
        });
        var gate_no = gate_no_baggage_claim_query.rows[0]["departure_gate"];
        var baggage_claim = gate_no_baggage_claim_query.rows[0]["baggage_claim"];


        //7: baggage_id given (skipped)

        await client.query(`INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
                            VALUES(${ticket_no}, ${flight_no}, '${seat_no}',${boarding_no},'${gate_no}','${baggage_claim}',${baggage_id})`);
        fs.appendFileSync("transaction.sql", "//Insert into boarding_passes//\r\rINSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)\rVALUES(${ticket_no}, ${flight_no}, '${seat_no}',${boarding_no},'${gate_no}','${baggage_claim}',${baggage_id})\r\r", function (err) {
            console.log(err);
        });
        //la fin 
        await client.query("COMMIT;");
        fs.appendFileSync("transaction.sql", "COMMIT;\r\r", function (err) {
            console.log(err);
        });
    } catch (e) {
        await client.query("ROLLBACK;");
        fs.appendFileSync("transaction.sql", "ROLLBACK;\r\r", function (err) {
            console.log(err);
        });
        throw (e); //will bypass the "Ending Correctly" throw
    }
}

//**constraint set on number_of_bags during CREATE TABLE */
//**CONSTRAINT (number_of_bags > -1 AND number_of_bags < 3)  */
async function makeBaggageInfo(client, number_of_bags) {
    try {

        await client.query("BEGIN;\r\r"); //start our transaction
        fs.appendFileSync("transaction.sql", "//Begin transaction for populating baggage_info table//\r\rBEGIN;\r\r", function (err) {
            console.log(err);
        });
        await client.query(`INSERT INTO baggage_info(number_of_bags)\r\rVALUES(${number_of_bags});\r\r`);
        fs.appendFileSync("transaction.sql", "//Insert into baggage_info number of bags user inputs//;\r\r", function (err) {
            console.log(err);
        });

        var baggage_id = await client.query(`SELECT baggage_id\rFROM baggage_info\rORDER BY baggage_id DESC LIMIT 1;\r\r`); //get baggage_id
        fs.appendFileSync("transaction.sql", "//Select baggage_id from baggage_info//;\r\r", function (err) {
            console.log(err);
        });
        await client.query("COMMIT;\r\r");
        fs.appendFileSync("transaction.sql", "COMMIT;\r\r", function (err) {
            console.log(err);
        });
        return Object.values(baggage_id.rows[0]); //return newest baggage_id

    } catch (e) {
        await client.query("ROLLBACK;\r\r");
        fs.appendFileSync("transaction.sql", "ROLLBACK;\r\r", function (err) {
            console.log(err);
        });
        throw (e); //will bypass the "Ending Correctly" throw
    }

}

