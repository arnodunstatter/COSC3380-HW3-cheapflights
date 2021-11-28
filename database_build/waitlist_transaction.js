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

async function attemptToChangeSeatClass(client, ticket_no, leaving_seat_class, desired_seat_class)
{
    //first we check that leaving_seat_class and desired_seat_class are correctly specified
    if(leaving_seat_class != "economy" && leaving_seat_class != "business")
        throw("leaving_seat_class incorrectly specified");
    if (desired_seat_class != "economy" && desired_seat_class != "business")
        throw("desired_seat_class incorrectly specified");
    
    //next we get our flight_no from our tickets table
    var flight_no = await client.query(
        `SELECT flight_no
            FROM tickets
            WHERE ticket_no = ${ticket_no};`
    );
    flight_no = flight_no.rows[0]["flight_no"];

    try //to do our transaction
    {
        //begin our transaction
        await client.query("BEGIN;");

        //if there are avialable seats in the desired class, then give them a seat and update the available seats
        var availableSeats = await client

        //else if there is no available seat in the desired class but someone is waiting on a seat in the class being changed from, swap their seat_nos, update waitlists
        
        //else if there is no available seat in the desired class and no one is waiting on a seat in the class being changed from, put that person on a waitlist for the desired class

        //end our transaction with a commit
        await client.query("COMMIT;");
    }
    catch(e)
    {
        await client.query("ROLLBACK;");
        throw(e);
    }
}