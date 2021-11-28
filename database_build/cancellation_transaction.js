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

        //react code goes here to grab the booking that user canceled var book_ref = <button></button>
        var book_ref = 15; //placeholder varabile for user input for book_ref
        await cancelBooking(client, book_ref);



        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

async function cancelBooking(client, book_ref) {
    /** start cancellation transaction */
    //if customer requests for a cancellation, select book_ref for the flight they want to cancel and set canceled to true

    try {
        //start our transaction
        await client.query("BEGIN;");

        //update the canceled status in the bookings
        await client.query(
            `UPDATE bookings 
                SET canceled = 't'
                    WHERE book_ref = ${book_ref};`
        );

        //retrieve information about the canceled booking and the relevant flight_no      
        var canceled_booking = await client.query(
            `SELECT economy_seats, business_seats, flight_no
                FROM bookings
                    JOIN tickets
                        ON bookings.book_ref = tickets.book_ref
                    WHERE bookings.book_ref = ${book_ref};`
        );

        canceled_booking = canceled_booking.rows[0]; //a map with keys: "economy_seats", "business_seats", "flight_no"
        var economy_seats = canceled_booking["economy_seats"];
        var business_seats = canceled_booking["business_seats"];

        //update available seats on the flight
        if (economy_seats >= 1) {
            await client.query(
                `UPDATE flights
                SET available_economy_seats = available_economy_seats + ${economy_seats}
                WHERE flight_no = ${canceled_booking["flight_no"]};`);
        } else if (business_seats >= 1) {
            await client.query(
                `UPDATE flights
                SET available_business_seats = available_business_seats + ${business_seats}
                WHERE flight_no = ${canceled_booking["flight_no"]};`);
        }


        await client.query("COMMIT;");
    } catch (e) {
        await client.query("ROLLBACK;");
        console.log("ERROR: MAX 10 SEATS ONLY")
        throw (e); //will bypass the "Ending Correctly" throw
    }
}