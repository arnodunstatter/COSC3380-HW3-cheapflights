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
        //user enters email address
        var email_address = "james_jameson@hotmail.org";
        await loginDisplayTickets(client, email_address);

        throw ("Ending Correctly");
    } catch (e) {
        console.error(e);
        client.end();
        console.log("Disconneced");
        console.log("Process ending");
        process.exit();
    }

}

async function loginDisplayTickets(client, email_address) {
    try {

        //displays 1
        //ticket_no, flight_no, aircraft_code, aircraft_name, passport_no, airport_code, airport_name, departure_time, 
        //departing_city, departing_country, airport_code, airport_name, arrival_time, arrival_city, 
        //arrival_country, seat_class, book_ref, total_amount 

        async function clientQueryAndWriteToQuerySQL(client, transactionStr)
        {
            fs.appendFileSync("query.sql", transactionStr+"\r", function (err) {
                console.log(err);
            });
            return await client.query(transactionStr);
        }

        var identifier = `loginDisplayTickets(client, ${email_address})\r`;
        fs.appendFileSync("query.sql", `\r\r--The following sql statements are part of the query for ${identifier}`, function (err) {
            console.log(err);
        });
        var display_tickets = await clientQueryAndWriteToQuerySQL(client,
`SELECT t.ticket_no, f.flight_no, plane.aircraft_code, plane.aircraft_name, p.passport_no, dep.airport_code AS departure_airport_code, dep.airport_name AS departure_airport_name, f.departure_time,
            dep.city_name AS departing_city, dep.country AS departing_country, arr.airport_code AS arrival_airport_code, arr.airport_name AS arrival_airport_name, f.arrival_time, arr.city_name AS arrival_city,
            arr.country AS arrival_country, t.seat_class, b.book_ref, b.total_amount
FROM tickets AS t
LEFT JOIN bookings AS b USING(book_ref)
LEFT JOIN flights AS f USING(flight_no)
LEFT JOIN airport_cities AS arr ON arr.airport_code = f.arrival_airport_code
LEFT JOIN airport_cities AS dep ON dep.airport_code = f.departure_airport_code
LEFT JOIN passengers AS p USING(passport_no)
LEFT JOIN aircraft AS plane USING(aircraft_code)
WHERE email_address = '${email_address}';`);

        console.log(display_tickets.rows);
    } catch (e) {

        throw (e); //will bypass the "Ending Correctly" throw
    }
}



// SELECT t.ticket_no, f.flight_no, plane.aircraft_code, plane.aircraft_name, p.passport_no, dep.airport_code, dep.airport_name, f.departure_time, dep.city_name AS departing_city, dep.country AS departing_country, arr.airport_code, arr.airport_name, f.arrival_time, arr.city_name AS arrival_city, arr.country AS arrival_country, t.seat_class, b.book_ref, b.total_amount 
//         FROM tickets AS t
//         LEFT JOIN bookings AS b USING(book_ref)
//         LEFT JOIN flights AS f USING(flight_no)
//         LEFT JOIN airport_cities AS arr ON arr.airport_code = f.arrival_airport_code
//         LEFT JOIN airport_cities AS dep ON dep.airport_code = f.departure_airport_code
//         LEFT JOIN passengers AS p USING(passport_no)
//         LEFT JOIN aircraft AS plane USING(aircraft_code)
//         WHERE email_address = 'james_jameson@hotmail.org';