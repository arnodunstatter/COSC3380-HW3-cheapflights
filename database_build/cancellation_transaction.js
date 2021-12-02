var fs = require("fs");
main();


async function main() {
    //now we make our client using our creds 
    const {
        Client
    } = require('pg');
    const creds = require('./creds_elephant.json');
    const client = new Client(creds);

    try {
        try {
            client.connect();

        } catch (e) {
            console.log("Problem connecting client");
            throw (e);
        }
        // 1, 2 ,3, 4, 5, 6, 7, 8,9, 10, 20
        //react code goes here to grab the booking that user canceled var book_ref = <button></button>
        var book_ref = 227; //placeholder varabile for user input for book_ref
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
    async function clientQueryAndWriteToTransactionSQL(client, transactionStr) {
        fs.appendFileSync("transaction.sql", transactionStr + "\r", function (err) {
            console.log(err);
        });
        return await client.query(transactionStr);
    }
    try {
        //start our transaction
        fs.appendFileSync("transaction.sql", `\r\r--Begin transaction for cancelBooking(client,${book_ref})\r`, function (err) {
            console.log(err);
        });
        await clientQueryAndWriteToTransactionSQL(client, "BEGIN;");
        //update the canceled status in the bookings
        await clientQueryAndWriteToTransactionSQL(client,
`UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = ${book_ref};`
        );

        //retrieve information about the canceled booking and the relevant flight_no
        var canceled_booking_flight = await clientQueryAndWriteToTransactionSQL(client,
`SELECT flight_no
    FROM tickets
    WHERE book_ref = ${book_ref};`
        );

        var flight_no = canceled_booking_flight.rows[0]["flight_no"];

        var canceled_booking_economy = await clientQueryAndWriteToTransactionSQL(client,
`SELECT economy_seats
    FROM bookings
    WHERE book_ref = ${book_ref};`
        );
        var economy_seats = canceled_booking_economy.rows[0]["economy_seats"];

        var canceled_booking_business = await clientQueryAndWriteToTransactionSQL(client,
`SELECT business_seats
    FROM bookings
    WHERE book_ref = ${book_ref};`
        );
        var business_seats = canceled_booking_business.rows[0]["business_seats"];


        //update available seats on the flight
        if (economy_seats >= 1) {
            await clientQueryAndWriteToTransactionSQL(client,
`UPDATE flights
    SET available_economy_seats = available_economy_seats + ${economy_seats}
    WHERE flight_no = ${flight_no};`);

        }
        if (business_seats >= 1) {
            await clientQueryAndWriteToTransactionSQL(client,
`UPDATE flights
    SET available_business_seats = available_business_seats + ${business_seats}
    WHERE flight_no = ${flight_no};`);
        }


        await clientQueryAndWriteToTransactionSQL(client, "COMMIT;");

    } catch (e) {
        await clientQueryAndWriteToTransactionSQL(client, "ROLLBACK;");
        console.log("ERROR: MAX 10 SEATS ONLY")
        throw (e); //will bypass the "Ending Correctly" throw
    }
}

// 4918 0 0
// 5219 8 9
// 5045 8 9

// update bookings set canceled = 'f';
// update flights set available_economy_seats = 8 where flight_no = 5219;
// update flights set available_business_seats = 9 where flight_no = 5219;
// update flights set available_business_seats = 0 where flight_no = 4918;
// update flights set available_economy_seats = 0 where flight_no = 4918;