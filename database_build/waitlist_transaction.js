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

        //first test simply adding someone to a waitlist (this is the last case in the function, i.e. case 3, the else else)
        //ticket_no==1 wants to change to business!
        //await attemptToChangeSeatClass(client, 1); //it worked!

        //test case 2
        //await attemptToChangeSeatClass(client, 19); //it worked!

        //test case 1
        await attemptToChangeSeatClass(client, 11);

        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

async function attemptToChangeSeatClass(client, ticket_no) {
    //their present tickets.seat_class is the leavingSeatClass
    var leavingSeatClass = await client.query(
        `SELECT seat_class\r
            FROM tickets\r
            WHERE ticket_no = ${ticket_no};\r\r`
    );
    fs.appendFileSync("query.sql", "//Leave user current seat class//" + leavingSeatClass, function (err) {
        console.log(err);
    });
    leavingSeatClass = leavingSeatClass.rows[0]["seat_class"];
    //the only other seat_class is the desiredSeatClass
    if (leavingSeatClass == "economy")
        var desiredSeatClass = "business";
    else //leavingSeatClass == "business"
        var desiredSeatClass = "economy";

    //next we get our passport_no and flight_no from our tickets table
    var passport_and_flight_nos = await client.query(
        `SELECT passport_no, flight_no\r
            FROM tickets\r
            WHERE ticket_no = ${ticket_no};\r\r`
    );
    fs.appendFileSync("query.sql", "//Get passport_no and flight_no from tickets table" + passport_and_flight_nos, function (err) {
        console.log(err);
    });
    var passport_no = passport_and_flight_nos.rows[0]["passport_no"];
    var flight_no = passport_and_flight_nos.rows[0]["flight_no"];

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
        await client.query("BEGIN;");
        fs.appendFileSync("transaction.sql", "//Begin transaction for waitlist//\r\rBEGIN;\r\r", function (err) {
            console.log(err);
        });

        //if there are avialable seats in the desired class, then give them a seat, update the the flight's available_seats, ticket's seat_class, and boarding_passes' seat_no
        //find how many availableSeats there are
        var availableSeats = await client.query(
            `SELECT available_${desiredSeatClass}_seats\r
                FROM flights\r
                WHERE flight_no = ${flight_no};\r\r`
        );

        fs.appendFileSync("transaction.sql", "//Find how many availableSeats there are//\r\r" + availableSeats, function (err) {
            console.log(err);
        });
        availableSeats = availableSeats.rows[0][`available_${desiredSeatClass}_seats`];
        if (availableSeats > 0) {
            //update flights.available_${desiredSeatClass}_seats
            await client.query(
                `UPDATE flights
                    SET available_${desiredSeatClass}_seats = available_${desiredSeatClass}_seats - 1
                    WHERE flight_no = ${flight_no};`
            );

            fs.appendFileSync("transaction.sql", "//Update flights.available_${desiredSeatClass}_seats//\r\rUPDATE flights\rSET available_${desiredSeatClass}_seats = available_${desiredSeatClass}_seats - 1\rWHERE flight_no = ${flight_no};\r\r", function (err) {
                console.log(err);
            });
            //update flights.available_${leavingSeatClass}_seats
            await client.query(
                `UPDATE flights
                    SET available_${leavingSeatClass}_seats = available_${leavingSeatClass}_seats + 1
                    WHERE flight_no = ${flight_no};`
            );
            fs.appendFileSync("transaction.sql", "//Update flights.available_${leavingSeatClass}_seats//\r\rUPDATE flights\rSET available_${leavingSeatClass}_seats = available_${leavingSeatClass}_seats + 1\rWHERE flight_no = ${flight_no};\r\r", function (err) {
                console.log(err);
            });
            //update tickets.seat_class
            await client.query(
                `UPDATE tickets
                    SET seat_class = '${desiredSeatClass}'
                    WHERE ticket_no = ${ticket_no};`
            );
            fs.appendFileSync("transaction.sql", "//Update tickets.seat_class//\r\rUPDATE flights\rSET seat_class = '${desiredSeatClass}'\rWHERE ticket_no = ${ticket_no};\r\r", function (err) {
                console.log(err);
            });
            //update boarding_passes.seat_no
            //first get how many people are already sitting in the desiredSeatClass
            var seat_no = await client.query(
                `SELECT count(*)\r
                    FROM boarding_passes\r
                    WHERE flight_no = ${flight_no} AND 
                        seat_no ILIKE '${desiredSeatClass[0]}%';\r\r`
            );
            fs.appendFileSync("transaction.sql", "//Update boarding passes.seat_no//\r\r" + seat_no, function (err) {
                console.log(err);
            });

            seat_no = 1 + parseInt(seat_no.rows[0]["count"]); //numericSeatNo = 1 + the number of people already seated in that class
            seat_no = desiredSeatClass[0].toUpperCase() + seat_no; //alphaNumericSeatNo
            //now we can update
            await client.query(
                `UPDATE boarding_passes
                    SET seat_no = '${seat_no}'
                    WHERE ticket_no = ${ticket_no};`
            );
            fs.appendFileSync("transaction.sql", "//Update boarding_passes table//\r\rUPDATE boarding_passes\r SET seat_no = '${seat_no}'\rWHERE ticket_no = ${ticket_no};\r\r", function (err) {
                console.log(err);
            });
        } else {
            //else if there is no available seat in the desired class but someone is waiting on a seat in the class being changed from, then swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
            //first check if someone is waiting on a seat in the leavingSeatClass
            var passport_no_AtPos1WaitingOnLeavingSeatClass = await client.query(
                `SELECT passport_no\r
                    FROM ${leavingSeatClass}_waitlist\r
                    WHERE position = 1 AND flight_no = ${flight_no};\r\r`
            );
            fs.appendFileSync("transaction.sql", "//Check if someone is waiting on a seat in the leavingSeatClass//\r\r" + passport_no_AtPos1WaitingOnLeavingSeatClass, function (err) {
                console.log(err);
            });
            if (passport_no_AtPos1WaitingOnLeavingSeatClass.rows.length > 0) //then swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
            {
                //get the passenger's seat_no
                var seat_no = await client.query(
                    `SELECT seat_no\r
                        FROM boarding_passes\r
                        WHERE ticket_no = ${ticket_no};\r\r`
                );
                fs.appendFileSync("transaction.sql", "//Get passenger seat_no//\r\r" + seat_no, function (err) {
                    console.log(err);
                });
                seat_no = seat_no.rows[0]["seat_no"];

                //get the swapper's passport_no, ticket_no, and seat_no (swapper is the person who is being swapped with)
                var swapper_passport_no = passport_no_AtPos1WaitingOnLeavingSeatClass.rows[0]["passport_no"];
                var swapper_ticket_no = await client.query(
                    `SELECT ticket_no\r
                        FROM tickets\r
                        WHERE flight_no = ${flight_no} AND passport_no = '${swapper_passport_no}';\r\r`
                );
                fs.appendFileSync("transaction.sql", "//Get swapper's passport_no'//\r\r" + swapper_ticket_no, function (err) {
                    console.log(err);
                });
                swapper_ticket_no = swapper_ticket_no.rows[0]["ticket_no"];
                var swapper_seat_no = await client.query(
                    `SELECT seat_no\r
                        FROM boarding_passes\r
                        WHERE ticket_no = ${swapper_ticket_no};\r\r`
                );
                fs.appendFileSync("transaction.sql", "//Get swapper ticket_no//\r\r" + swapper_seat_no, function (err) {
                    console.log(err);
                });
                swapper_seat_no = swapper_seat_no.rows[0]["seat_no"];

                //swap their boarding_passes.seat_no(s) and their tickets.seat_class(es)
                //make variables (for readability)
                var new_seat_no = swapper_seat_no;
                var new_seat_class = desiredSeatClass;
                var swapper_new_seat_no = seat_no;
                var swapper_new_seat_class = leavingSeatClass;
                //update tables
                //update passenger's tickets.seat_class and boarding_passes.seat_no
                await client.query(
                    `UPDATE tickets
                        SET seat_class = '${new_seat_class}'
                        WHERE ticket_no = ${ticket_no};
                    UPDATE boarding_passes
                        SET seat_no = '${new_seat_no}'
                        WHERE ticket_no = ${ticket_no};`
                );
                fs.appendFileSync("transaction.sql", "//Update passenger's tickets.seat_class and boarding_passes.seat_no//\r\rUPDATE tickets\rSET seat_class = '${new_seat_class}'\rHERE ticket_no = ${ticket_no};\r\rUPDATE boarding_passes\rSET seat_no = '${new_seat_no}'\rWHERE ticket_no = ${ticket_no};\r\r", function (err) {
                    console.log(err);
                });
                //update swapper's tickets.seat_class and boarding_passes.seat_no
                await client.query(
                    `UPDATE tickets
                        SET seat_class = '${swapper_new_seat_class}'
                        WHERE ticket_no = ${swapper_ticket_no};
                    UPDATE boarding_passes
                        SET seat_no = '${swapper_new_seat_no}'
                        WHERE ticket_no = ${swapper_ticket_no};`
                );
                fs.appendFileSync("transaction.sql", "//Update swapper's tickets.seat_class and boarding_passes.seat_no//\r\rUpdate tickets\rSET seat_class = '${swapper_new_seat_class}'\rWHERE ticket_no = ${swapper_ticket_no};\r\rUPDATE boarding_passes\rSET seat_no = '${swapper_new_seat_no}'\rWHERE ticket_no = ${swapper_ticket_no};\r\r", function (err) {
                    console.log(err);
                });

                //update the waitlist swapper was in
                await client.query(
                    `UPDATE ${leavingSeatClass}_waitlist
                        SET position = position - 1
                        WHERE flight_no = ${flight_no};`
                );
                fs.appendFileSync("transaction.sql", "//Update the waitlist swapper was in//\r\rUPDATE ${leavingSeatClass}_waitlist\rSET position = position - 1\rWHERE flight_no = ${flight_no};\r\r", function (err) {
                    console.log(err);
                });
            } else //(there is no available seat in the desired class and no one is waiting on a seat in the class being changed from) put that person on a waitlist for the desired class
            {
                //make sure they're not already in the waitlist, if they are already in the waitlist, throw an error
                var alreadyThere = await client.query(
                    `SELECT position\r
                        FROM ${desiredSeatClass}_waitlist\r
                        WHERE flight_no = ${flight_no} AND passport_no = '${passport_no}';\r\r`
                );
                fs.appendFileSync("transaction.sql", "//Making sure they're not already in the waitlist//\r\r" + alreadyThere, function (err) {
                    console.log(err);
                });
                if (alreadyThere.rows.length > 0) {
                    var alreadyAtPosition = alreadyThere.rows[0]["position"];
                    var indefiniteArticle;
                    desiredSeatClass == "economy" ? indefiniteArticle = "an" : indefiniteArticle = "a";
                    throw (`Passenger with passport number ${passport_no} on flight ${flight_no} is already at position ${alreadyAtPosition} on the waitlist for ${indefiniteArticle} ${desiredSeatClass} seat.`);
                }
                //find their position in the waitlist
                var highestPositionInLine = await client.query(
                    `SELECT MAX(position)\r
                        FROM ${desiredSeatClass}_waitlist\r
                        WHERE flight_no = ${flight_no};\r\r`
                );
                fs.appendFileSync("transaction.sql", "//Find their position on the waitlist//\r\r" + highestPositionInLine, function (err) {
                    console.log(err);
                });
                if (highestPositionInLine.rows.length > 0)
                    highestPositionInLine = highestPositionInLine.rows[0]["max"];
                else
                    highestPositionInLine = 0;
                var position = highestPositionInLine + 1;

                //add them to the waitlist 
                await client.query(
                    `INSERT INTO ${desiredSeatClass}_waitlist
                        VALUES (${position}, ${flight_no}, '${passport_no}');`
                );
                fs.appendFileSync("transaction.sql", "//Add them to the waitlist//\r\rINSERT INTO ${desiredSeatClass}_waitlist\rVALUES (${position}, ${flight_no}, '${passport_no}');\r\r", function (err) {
                    console.log(err);
                });
            }
        }

        //end our transaction with a commit
        await client.query("COMMIT;");
        fs.appendFileSync("transaction.sql", "COMMIT;\r\r", function (err) {
            console.log(err);
        });
    } catch (e) {
        await client.query("ROLLBACK;");
        fs.appendFileSync("transaction.sql", "ROLLBACK;\r\r", function (err) {
            console.log(err);
        });
        throw (e);
    }
}