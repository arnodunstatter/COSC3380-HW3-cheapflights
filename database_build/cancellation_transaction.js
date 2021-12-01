var fs = require("fs");
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
        // 1, 2 ,3, 4, 5, 6, 7, 8,9, 10, 20
        //react code goes here to grab the booking that user canceled var book_ref = <button></button>
        var book_ref = 18; //placeholder varabile for user input for book_ref
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
        fs.appendFileSync("transaction.sql", "//Begin transaction for cancellations//\r\rBEGIN;\r\r", function (err) {
            console.log(err);
        });

        //update the canceled status in the bookings
        await client.query(
            `UPDATE bookings 
                SET canceled = 't'
                    WHERE book_ref = ${book_ref};`
        );
        fs.appendFileSync("transaction.sql", "//Update the canceled status in the bookings//\r\rUPDATE bookings\rSET canceled = 't'\rWHERE book_ref = ${book_ref}\r\r", function (err) {
            console.log(err);
        });
        //retrieve information about the canceled booking and the relevant flight_no      
        var canceled_booking = await client.query(
            `SELECT economy_seats, business_seats, flight_no\r
                FROM bookings\r
                    JOIN tickets\r
                        ON bookings.book_ref = tickets.book_ref\r
                    WHERE bookings.book_ref = ${book_ref};\r\r`
        );
        fs.appendFileSync("transaction.sql", "//Retrieve information about the canceled booking and relevant flight_no//\r\r" + canceled_booking, function (err) {
            console.log(err);
        });
        canceled_booking = canceled_booking.rows[0]; //a map with keys: "economy_seats", "business_seats", "flight_no"
        var economy_seats = canceled_booking["economy_seats"];
        var business_seats = canceled_booking["business_seats"];
        console.log(canceled_booking);

        //update available seats on the flight
        if (economy_seats >= 1) {
            await client.query(
                `UPDATE flights
                SET available_economy_seats = available_economy_seats + ${economy_seats}
                WHERE flight_no = ${canceled_booking["flight_no"]};`);
            fs.appendFileSync("transaction.sql", "//Update available economy seats//\r\rUPDATE flights\rSET available_economy_seats = available_economy_seats + ${economy_seats}\rWHERE flight_no = ${canceled_booking['flight_no']};\r\r", function (err) {
                console.log(err);
            });
        }
        if (business_seats >= 1) {
            await client.query(
                `UPDATE flights
                SET available_business_seats = available_business_seats + ${business_seats}
                WHERE flight_no = ${canceled_booking["flight_no"]};`);
            fs.appendFileSync("transaction.sql", "//Update available business seats//\r\rUPDATE flights\rSET available_business_seats = available_business_seats + ${business_seats}\rWHERE flight_no = ${canceled_booking['flight_no']};\r\r", function (err) {
                console.log(err);
            });
        }


        await client.query("COMMIT;");
        fs.appendFileSync("transaction.sql", "COMMIT;\r\r", function (err) {
            console.log(err);
        });
    } catch (e) {
        await client.query("ROLLBACK;");
        fs.appendFileSync("transaction.sql", "ROLLBACK;\r\r", function (err) {
            console.log(err);
        });
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
