    var fs = require("fs");
    module.exports = app => {
        app.post('/waitlist', async (req, res) => {
        main(req.body.ticket_no);

        async function main(ticket_no) {
            //now we make our client using our creds
            const { Client } = require('pg');
            const creds = require('../config/creds.json');
            const client = new Client(creds);

            try {
                try {
                    client.connect();

                } catch (e) {
                    console.log("Problem connecting client");
                    throw (e);
                }

                //first test simply adding someone to a waitlist (this is the last case in the function, i.e. case 3, the else else)
                //ticket_no==1 wants to change to business!
                //await attemptToChangeSeatClass(client, 1); //it worked!

                //test case 2
                //await attemptToChangeSeatClass(client, 19); //it worked!

                //test case 1
                await attemptToChangeSeatClass(client, ticket_no);

                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
                console.log("Disconneced");
                console.log("Process ending");
            }

        }

        async function attemptToChangeSeatClass(client, ticket_no) {
            //their present tickets.seat_class is the leavingSeatClass
            async function clientQueryAndWriteToTransactionSQL(client, transactionStr)
            {
                fs.appendFileSync("./Client/public/transaction.sql", transactionStr+"\r", function (err) {
                    console.log(err);
                });
                return await client.query(transactionStr);
            }

            try //to do our transaction
            {
                /* PSEUDOCODE
                1. if there are avialable seats in the desired class, then give them a seat, update the the flight's available_seats, ticket's seat_class, and boarding_passes' seat_no
                2. else if there is no available seat in the desired class but someone is waiting on a seat in the class being changed from, then...
                    swap their seat_nos in boarding_passes, update their tickets.seatClass, and update the waitlist
                3. else (there is no available seat in the desired class and no one is waiting on a seat in the class being changed from) 
                    put that person on a waitlist for the desired class
                */


                //begin our transaction
                fs.appendFileSync("./Client/public/transaction.sql",`\r\r--The following sql statements are part of the transaction for attemptToChangeSeatClass(client,${ticket_no})\r`);
                await clientQueryAndWriteToTransactionSQL(client,"BEGIN;");
                var leavingSeatClass = await clientQueryAndWriteToTransactionSQL(client,
`SELECT seat_class 
    FROM tickets 
    WHERE ticket_no = ${ticket_no};`
                );
            
                leavingSeatClass = leavingSeatClass.rows[0]["seat_class"];
                //the only other seat_class is the desiredSeatClass
                if (leavingSeatClass == "economy")
                    var desiredSeatClass = "business";
                else //leavingSeatClass == "business"
                    var desiredSeatClass = "economy";
            
                //next we get our passport_no and flight_no from our tickets table
                var passport_and_flight_nos = await clientQueryAndWriteToTransactionSQL(client,
`SELECT passport_no, flight_no 
    FROM tickets 
    WHERE ticket_no = ${ticket_no};`
                );
                
                var passport_no = passport_and_flight_nos.rows[0]["passport_no"];
                var flight_no = passport_and_flight_nos.rows[0]["flight_no"];
            
            

                //if there are avialable seats in the desired class, then give them a seat, update the the flight's available_seats, ticket's seat_class, and boarding_passes' seat_no
                //find how many availableSeats there are
                var availableSeats = await clientQueryAndWriteToTransactionSQL(client,
`SELECT available_${desiredSeatClass}_seats 
    FROM flights 
    WHERE flight_no = ${flight_no};`
                );


                availableSeats = availableSeats.rows[0][`available_${desiredSeatClass}_seats`];
                if (availableSeats > 0) {
                    //update flights.available_${desiredSeatClass}_seats
                    await clientQueryAndWriteToTransactionSQL(client,
`UPDATE flights
    SET available_${desiredSeatClass}_seats = available_${desiredSeatClass}_seats - 1
    WHERE flight_no = ${flight_no};`
                    );

                    //update flights.available_${leavingSeatClass}_seats
                    await clientQueryAndWriteToTransactionSQL(client,
`UPDATE flights
    SET available_${leavingSeatClass}_seats = available_${leavingSeatClass}_seats + 1
    WHERE flight_no = ${flight_no};`
                    );

                    //update tickets.seat_class
                    await clientQueryAndWriteToTransactionSQL(client,
`UPDATE tickets
    SET seat_class = '${desiredSeatClass}'
    WHERE ticket_no = ${ticket_no};`
                    );

                    //update boarding_passes.seat_no
                    //first get how many people are already sitting in the desiredSeatClass
                    var seat_no = await clientQueryAndWriteToTransactionSQL(client,
`SELECT count(*) 
    FROM boarding_passes 
    WHERE flight_no = ${flight_no} 
        AND seat_no ILIKE '${desiredSeatClass[0]}%';`
                    );


                    seat_no = 1 + parseInt(seat_no.rows[0]["count"]); //numericSeatNo = 1 + the number of people already seated in that class
                    seat_no = desiredSeatClass[0].toUpperCase() + seat_no; //alphaNumericSeatNo
                    //now we can update
                    await clientQueryAndWriteToTransactionSQL(client,
`UPDATE boarding_passes
    SET seat_no = '${seat_no}'
    WHERE ticket_no = ${ticket_no};`
                    );
        
                } else {
                    //else if there is no available seat in the desired class but someone is waiting on a seat in the class being changed from, then swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
                    //first check if someone is waiting on a seat in the leavingSeatClass
                    var passport_no_AtPos1WaitingOnLeavingSeatClass = await clientQueryAndWriteToTransactionSQL(client,
`SELECT passport_no 
    FROM ${leavingSeatClass}_waitlist 
    WHERE position = 1 AND flight_no = ${flight_no};`
                    );

                    if (passport_no_AtPos1WaitingOnLeavingSeatClass.rows.length > 0) //then swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
                    {
                        //get the passenger's seat_no
                        var seat_no = await clientQueryAndWriteToTransactionSQL(client,
`SELECT seat_no 
    FROM boarding_passes 
    WHERE ticket_no = ${ticket_no};`
                        );

                        seat_no = seat_no.rows[0]["seat_no"];

                        //get the swapper's passport_no, ticket_no, and seat_no (swapper is the person who is being swapped with)
                        var swapper_passport_no = passport_no_AtPos1WaitingOnLeavingSeatClass.rows[0]["passport_no"];
                        var swapper_ticket_no = await clientQueryAndWriteToTransactionSQL(client,
`SELECT ticket_no 
    FROM tickets 
    WHERE flight_no = ${flight_no} 
        AND passport_no = '${swapper_passport_no}';`
                        );

                        swapper_ticket_no = swapper_ticket_no.rows[0]["ticket_no"];
                        var swapper_seat_no = await clientQueryAndWriteToTransactionSQL(client,
`SELECT seat_no 
    FROM boarding_passes 
    WHERE ticket_no = ${swapper_ticket_no};`
                        );

                        swapper_seat_no = swapper_seat_no.rows[0]["seat_no"];

                        //swap their boarding_passes.seat_no(s) and their tickets.seat_class(es)
                        //make variables (for readability)
                        var new_seat_no = swapper_seat_no;
                        var new_seat_class = desiredSeatClass;
                        var swapper_new_seat_no = seat_no;
                        var swapper_new_seat_class = leavingSeatClass;
                        //update tables
                        //update passenger's tickets.seat_class and boarding_passes.seat_no
                        await clientQueryAndWriteToTransactionSQL(client,
`UPDATE tickets
    SET seat_class = '${new_seat_class}'
        WHERE ticket_no = ${ticket_no};
UPDATE boarding_passes
    SET seat_no = '${new_seat_no}'
        WHERE ticket_no = ${ticket_no};`
                        );

                        //update swapper's tickets.seat_class and boarding_passes.seat_no
                        await clientQueryAndWriteToTransactionSQL(client,
`UPDATE tickets
    SET seat_class = '${swapper_new_seat_class}'
        WHERE ticket_no = ${swapper_ticket_no};
UPDATE boarding_passes
    SET seat_no = '${swapper_new_seat_no}'
        WHERE ticket_no = ${swapper_ticket_no};`
                        );


                        //update the waitlist swapper was in
                        await clientQueryAndWriteToTransactionSQL(client,
`UPDATE ${leavingSeatClass}_waitlist
    SET position = position - 1
        WHERE flight_no = ${flight_no};`
                        );
                    }
                    else //(there is no available seat in the desired class and no one is waiting on a seat in the class being changed from) put that person on a waitlist for the desired class
                    {
                        //make sure they're not already in the waitlist, if they are already in the waitlist, throw an error
                        var alreadyThere = await clientQueryAndWriteToTransactionSQL(client,
`SELECT position
    FROM ${desiredSeatClass}_waitlist
        WHERE flight_no = ${flight_no} AND passport_no = '${passport_no}';`
                        );

                        if (alreadyThere.rows.length > 0) {
                            var alreadyAtPosition = alreadyThere.rows[0]["position"];
                            var indefiniteArticle;
                            desiredSeatClass == "economy" ? indefiniteArticle = "an" : indefiniteArticle = "a";
                            throw (`Passenger with passport number ${passport_no} on flight ${flight_no} is already at position ${alreadyAtPosition} on the waitlist for ${indefiniteArticle} ${desiredSeatClass} seat.`);
                        }
                        //find their position in the waitlist
                        var highestPositionInLine = await clientQueryAndWriteToTransactionSQL(client,
`SELECT MAX(position)
    FROM ${desiredSeatClass}_waitlist
    WHERE flight_no = ${flight_no};`
                        );

                        if (highestPositionInLine.rows.length > 0)
                            highestPositionInLine = highestPositionInLine.rows[0]["max"];
                        else
                            highestPositionInLine = 0;
                        var position = highestPositionInLine + 1;

                        //add them to the waitlist 
                        await clientQueryAndWriteToTransactionSQL(client,
`INSERT INTO ${desiredSeatClass}_waitlist
    VALUES (${position}, ${flight_no}, '${passport_no}');`
                        );
                    }
                }



                //end our transaction with a commit
                await clientQueryAndWriteToTransactionSQL(client,"COMMIT;");
            } catch (e) {
                await clientQueryAndWriteToTransactionSQL(client,"ROLLBACK;");
                throw (e);
            }
        }
    });
};
