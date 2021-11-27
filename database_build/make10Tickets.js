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

        var tickets = [];

        for (let i = 0; i < 10; ++i) {
            //for each row in tickets we need:
            //depart_date timestamp, seat_class varchar(10), book_ref int, passport_no varchar(9), flight_no int
            var ticket = [];

            //old depart_date
            //pushing the first flight departure_time 
            //to change flight number, change OFFSET; OFFSET 0 == first flight_no in flights table, OFFSET 1 == second flight_no...etc
            // var depart_date_sql = `SELECT departure_time FROM flights ORDER BY flight_no asc LIMIT 1 OFFSET 0;`;
            // var depart_date = await client.query(depart_date_sql);
            // depart_date = depart_date.rows[0]["departure_time"];
            // ticket.push(depart_date);

            //new depart_date
            var depart_date = `current_date + interval '5 days'`;
            ticket.push(depart_date);

            //push seat class
            var seat_class_sql = `SELECT CASE WHEN EXISTS(SELECT economy_seats FROM passengers_bookings LEFT JOIN bookings USING(book_ref) 
                                WHERE economy_seats = 1 AND book_ref = '${i+1}') THEN 'economy' ELSE 'business' END;`;
            var seat_class = await client.query(seat_class_sql);
            seat_class = seat_class.rows[0]["case"];
            ticket.push(seat_class);

            //push book_ref
            var book_ref_sql = `SELECT book_ref FROM passengers_bookings LEFT JOIN bookings USING(book_ref) WHERE book_ref = '${i+1}'`;
            var book_ref = await client.query(book_ref_sql);
            book_ref = book_ref.rows[0]["book_ref"];
            ticket.push(book_ref);

            //push passport_no
            var passport_no_sql = `SELECT passport_no FROM passengers_bookings LEFT JOIN bookings USING(book_ref) WHERE book_ref = '${i+1}'`;
            var passport_no = await client.query(passport_no_sql);
            passport_no = passport_no.rows[0]["passport_no"];
            ticket.push(passport_no);

            //push flight_no
            //to change flight number, change OFFSET; OFFSET 0 == first flight_no in flights table, OFFSET 1 == second flight_no...etc
            var flight_no_sql = `SELECT flight_no FROM flights ORDER BY flight_no asc LIMIT 1 OFFSET 0;`;
            var flight_no = await client.query(flight_no_sql);
            flight_no = flight_no.rows[0]["flight_no"];
            ticket.push(flight_no);

            tickets.push(ticket)
            // console.log(tickets[i][0]);
            // console.log(`INSERT INTO tickets (depart_date, seat_class, book_ref, passport_no, flight_no)
            // VALUES (${tickets[i][0]}, '${tickets[i][1]}', ${tickets[i][2]},'${tickets[i][3]}',${tickets[i][4]});`)
            await client.query(
                `INSERT INTO tickets (depart_date, seat_class, book_ref, passport_no, flight_no)
                VALUES (${tickets[i][0]}, '${tickets[i][1]}', ${tickets[i][2]},'${tickets[i][3]}',${tickets[i][4]});`
            );

        }
        // console.log(tickets);
        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}



// SELECT economy_seats FROM passengers_bookings LEFT JOIN bookings USING(book_ref) WHERE economy_seats = 1 AND book_ref = '${i}';
// SELECT business_seats FROM passengers_bookings LEFT JOIN bookings USING(book_ref) WHERE business_seats = 1 AND book_ref = '${i}';


// SELECT economy_seats 
// FROM passengers_bookings 
// LEFT JOIN bookings USING(book_ref) 
// WHERE economy_seats = 1 AND book_ref = 1;

// SELECT book_ref,
//     CASE WHEN(SELECT economy_seats FROM passengers_bookings LEFT JOIN bookings USING(book_ref) WHERE economy_seats = 1 AND book_ref = 1) THEN 1
//         WHEN(SELECT business_seats FROM passengers_bookings LEFT JOIN bookings USING(book_ref) WHERE business_seats = 1 AND book_ref = 4) THEN 1
//         ELSE 0 END    FROM passengers_bookings LEFT JOIN bookings USING(book_ref);


//SELECT CASE WHEN EXISTS(SELECT economy_seats FROM passengers_bookings LEFT JOIN bookings USING(book_ref) 
//WHERE economy_seats = 1 AND book_ref = 1) THEN 'economy' ELSE 'business' END;