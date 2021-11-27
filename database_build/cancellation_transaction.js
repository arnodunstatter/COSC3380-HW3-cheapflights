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


/** start cancellation transaction */
            //if customer requests for a cancellation, select book_ref for the flight they want to cancel and set canceled to true

            //react code goes here to grab the booking that user canceled var book_ref = <button></button>
            await client.query(`BEGIN; 
                                 UPDATE bookings SET canceled = 't'
                                 WHERE book_ref = ${book_ref};
                                 COMMIT;`);
            
             var canceled_booking = await client.query(`SELECT book_ref, canceled, economy_seats, business_seats FROM bookings
                                                        JOIN tickets USING(book_ref)
                                                        JOIN flights USING(flight_no)
                                                        WHERE canceled = 't'
                                                        AND book_ref = ${book_ref};`);
                                                         
            // **cancellation add seat back transaction*/

                if(canceled_booking.rows[1] == 't')
                {
                await client.query(
                    `UPDATE flights
                        SET available_economy_seats = available_economy_seats + 1
                        WHERE flight_no = ${flight_no};`);

                await client.query(
                    `UPDATE flights
                        SET available_business_seats = available_business_seats + 1
                        WHERE flight_no = ${flight_no};`);
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