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

async function attemptToChangeSeatClass(client, ticket_no, leavingSeatClass, desiredSeatClass)
{
    //first we check that leaving_seat_class and desired_seat_class are correctly specified
    if(leavingSeatClass != "economy" && leavingSeatClass != "business")
        throw("leaving_seat_class incorrectly specified");
    if (desiredSeatClass != "economy" && desiredSeatClass != "business")
        throw("desired_seat_class incorrectly specified");
    
    //next we get our passport_no and flight_no from our tickets table
    var passport_and_flight_nos = await client.query(
        `SELECT passport_no, flight_no
            FROM tickets
            WHERE ticket_no = ${ticket_no};`
    );
    var passport_no = passport_and_flight_nos.rows[0]["passport_no"];
    var flight_no = passport_and_flight_nos.rows[0]["flight_no"];

    try //to do our transaction
    {
        /* PSEUDOCODE
        1. if there are avialable seats in the desired class, then give them a seat, update the the flight's available_seats, ticket's seat_class, and boarding_passes' seat_no
        2. else if there is no available seat in the desired class but someone is waiting on a seat in the class being changed from, then...
            swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
        3. else (there is no available seat in the desired class and no one is waiting on a seat in the class being changed from) 
            put that person on a waitlist for the desired class
        */


        //begin our transaction
        await client.query("BEGIN;");

        //if there are avialable seats in the desired class, then give them a seat, update the the flight's available_seats, ticket's seat_class, and boarding_passes' seat_no
            //find how many availableSeats there are
        var availableSeats = await client.query(
            `SELECT available_${desiredSeatClass}_seats
                FROM flights
                WHERE flight_no = ${flight_no};`
        );
        availableSeats = availableSeats.rows[0][`available_${desiredSeatClass}_seats`];
        if (availableSeats > 0)
        {
            //update flights.available_${desiredSeatClass}_seats
            await client.query(
                `UPDATE flights
                    SET available_${desiredSeatClass}_seats = available_${desiredSeatClass}_seats - 1
                    WHERE flight_no = ${flight_no};`
            );
            //update flights.available_${leavingSeatClass}_seats
            await client.query(
                `UPDATE flights
                    SET available_${leavingSeatClass}_seats = available_${leavingSeatClass}_seats - 1
                    WHERE flight_no = ${flight_no};`
            );
            //update tickets.seat_class
            await client.query(
                `UPDATE tickets
                    SET seat_class = ${desiredSeatClass}
                    WHERE ticket_no = ${ticket_no};`
            );
            //update boarding_passes.seat_no
                //first get how many people are already sitting in the desiredSeatClass
            var seat_no = await client.query(
                `SELECT count(*)
                    FROM boarding_passes
                    WHERE flight_no = ${flight_no} AND 
                        seat_no ILIKE '${desiredSeatClass[0]}%;`
            );
            seat_no = 1 + seat_no.rows[0]["count"]; //numericSeatNo = 1 + the number of people already seated in that class
            seat_no = desiredSeatClass[0]+seat_no;  //alphaNumericSeatNo
                //now we can update
            await client.query(
                `UPDATE boarding_passes
                    SET seat_no = ${seat_no}
                    WHERE ticket_no = ${ticket_no};`
            );
        }
        else
        {
            //else if there is no available seat in the desired class but someone is waiting on a seat in the class being changed from, then swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
                //first check if someone is waiting on a seat in the leavingSeatClass
            var ppnAtPos1WaitingOnLeavingSeatClass = await client.query(
                `SELECT passport_no
                    FROM ${leavingSeatClass}_waitlist
                    WHERE position = 1 AND flight_no = ${flight_no};`
            );
            if(ppnAtPos1WaitingOnLeavingSeatClass.rows.length > 0) //then swap their seat_nos in boarding_passes, update the waitlist, update tickets.seatClass for both
            {
                ppnAtPos1WaitingOnLeavingSeatClass = ppnAtPos1WaitingOnLeavingSeatClass.rows[0]["passport_no"];
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PICK UP HERE

            }
            else //(there is no available seat in the desired class and no one is waiting on a seat in the class being changed from) put that person on a waitlist for the desired class
            {

            }
            

            
        }

        //end our transaction with a commit
        await client.query("COMMIT;");
    }
    catch(e)
    {
        await client.query("ROLLBACK;");
        throw(e);
    }
}