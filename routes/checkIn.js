const fs = require("fs");

 module.exports = app => {
    app.post('/check-in', async(req, res) => {
        
        main(req.body.props.ticketNumber, req.body.props.bagAmount);

        async function main(ticket_no, number_of_bags) {
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

                //**user clicks check-in button, prompt user for number of bags, and then generate boarding passes after they input # of bags*/

                await checkIn(client, ticket_no, number_of_bags);
            
                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
                console.log("Disconneced");
                console.log("Process ending");
            }
        }

        //**constraint set on number_of_bags during CREATE TABLE */
        //**CONSTRAINT (number_of_bags > -1 AND number_of_bags < 3)  */
        async function checkIn(client, ticket_no, number_of_bags) {
            async function clientQueryAndWriteToTransactionSQL(client, transactionStr)
            {
                fs.appendFileSync("transaction.sql", transactionStr+"\r", function (err) {
                    console.log(err);
                });
                return await client.query(transactionStr);
            }
            try {
                fs.appendFileSync("transaction.sql", `\r\r--The following sql statements are part of the transaction for checkIn(client,${ticket_no}, ${number_of_bags})\r`, function (err) {
                    console.log(err);
                });
                await clientQueryAndWriteToTransactionSQL(client,"BEGIN;"); //start our transaction

                await clientQueryAndWriteToTransactionSQL(client,
`INSERT INTO baggage_info(number_of_bags)
    VALUES(${number_of_bags});`
                );


                var baggage_id = await clientQueryAndWriteToTransactionSQL(client,
`SELECT baggage_id
    FROM baggage_info
    ORDER BY baggage_id DESC 
    LIMIT 1;`
                ); //get baggage_id


                var baggage_id = Object.values(baggage_id.rows[0]); //return newest baggage_id

                //1: ticket_no given (skipped)

                //2: get flight_no from flights table
                var flight_no_query = await clientQueryAndWriteToTransactionSQL(client,
`SELECT flight_no
    FROM tickets
    WHERE ticket_no = ${ticket_no};`
                );

                var flight_no = flight_no_query.rows[0]["flight_no"];


                //3: get seat_no by first determining seat_class
                var seat_class_query = await clientQueryAndWriteToTransactionSQL(client,
`SELECT seat_class
    FROM tickets\rWHERE ticket_no = ${ticket_no};`
                );
            

                var seat_class = seat_class_query.rows[0]["seat_class"];


                //3.1: get economy_seat_no
                if (seat_class == "economy") {

                    var e_seat_no_query = await clientQueryAndWriteToTransactionSQL(client,
`SELECT COUNT(*)+1
    FROM boarding_passes
    LEFT JOIN tickets USING(ticket_no)
    WHERE tickets.flight_no = ${flight_no}\rAND seat_class = '${seat_class}';`
                    );

                    var e_seat_position = e_seat_no_query.rows[0]["?column?"];


                    if (e_seat_position > 10) {
                        throw ("Economy Seats Full at 10");
                    }
                    var e_seat_no = await clientQueryAndWriteToTransactionSQL(client,
`SELECT CONCAT('E', ${e_seat_position});`
                    );

                    var e_seat_no = e_seat_no.rows[0]["concat"];
                    var seat_no = e_seat_no;


                    //3.2: get business_seat_no
                } else if (seat_class == "business") {
                    var b_seat_no_query = await clientQueryAndWriteToTransactionSQL(client,
`SELECT COUNT(*)+1
    FROM boarding_passes
    LEFT JOIN tickets USING(ticket_no)
        WHERE tickets.flight_no = ${flight_no}
            AND seat_class = '${seat_class}';`
                    );

                    var b_seat_position = b_seat_no_query.rows[0]["?column?"];
                    console.log(b_seat_position)

                    if (b_seat_position > 10) {
                        throw ("Business Seats Full at 10")
                    }
                    var b_seat_no = await clientQueryAndWriteToTransactionSQL(client,
`SELECT CONCAT('B', ${b_seat_position});`
                    );

                    var b_seat_no = b_seat_no.rows[0]["concat"];
                    var seat_no = b_seat_no;

                }

                //4: get boarding_no
                var boarding_no_query = await clientQueryAndWriteToTransactionSQL(client,
`SELECT COUNT(*)+1
    FROM boarding_passes
    WHERE flight_no = ${flight_no};`
                );

                var boarding_no = boarding_no_query.rows[0]["?column?"]


                //5 & 6: get departing gate_no & baggage_claim
                var gate_no_baggage_claim_query = await clientQueryAndWriteToTransactionSQL(client,
`SELECT departure_gate, baggage_claim\rFROM flights\rWHERE flight_no = ${flight_no};\r\r`
                );

                var gate_no = gate_no_baggage_claim_query.rows[0]["departure_gate"];
                var baggage_claim = gate_no_baggage_claim_query.rows[0]["baggage_claim"];


                //7: baggage_id given (skipped)

                await clientQueryAndWriteToTransactionSQL(client,
`INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
    VALUES(${ticket_no}, ${flight_no}, '${seat_no}',${boarding_no},'${gate_no}','${baggage_claim}',${baggage_id});`);
        
                //la fin 
                await clientQueryAndWriteToTransactionSQL(client,"COMMIT;");
            } catch (e) {
                await clientQueryAndWriteToTransactionSQL(client,"ROLLBACK;\r\r");
                throw (e); //will bypass the "Ending Correctly" throw
            }

        }
    });
}