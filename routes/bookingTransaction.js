module.exports = app => {
    app.post('/checkout-Confirmation', async (req, res) => {
        var fs = require("fs");
        main(req.body.flight_nos, req.body.economySeats, req.body.businessSeats, req.body.discount_code, req.body.card_no, req.body.passengersInfo);
        
        async function main(flight_nos, economySeats, businessSeats, discount_code, card_no, passengersInfo) {
            //now we make our client using our creds
            
            const {
                Client
            } = require('pg');
            const creds = require('../config/creds.json');
            const client = new Client(creds);

            try {
                try {
                    client.connect();

                } catch (e) {
                    console.log("Problem connecting client");
                    throw (e);
                }

                //**after user clicks PAY button, complete bookings and generate tickets */
                //creates entries in bookings, tickets, passengers, and passengers_bookings and updates available_seats in flights
                //the following values will be input by user in the web-form
                /*
                var flight_nos = [4997, 5266]; //this will be 'input' by the user by them selecting a viable flight after they specify the whens and wheres
                var economySeats = 2;
                var businessSeats = 1;
                var discount_code = "none";
                var card_no = "0987123467409826";

                // we will do 3 passengers so passengersInfo.length==3
                var passengersInfo = [
                    //[passport_no, first_name, last_name, email_address, phone_no, dob, seatClass]
                    ["549628741", "James", "Jameson", "james_jameson@hotmail.org", "5127898495", "1950-01-01", "economy"],
                    ["987456321", "Bill", "Billson", "bill_billson@hotmail.org", "5128447733", "1951-02-02", "economy"],
                    ["159753852", "Kevin", "Kevinson", "kevin_kevinson@hotmail.org", "512812999", "1953-03-03", "business"]
                ];
                */
                // var passengersInfo = [
                //     //[passport_no, first_name, last_name, email_address, phone_no, dob, seatClass]
                //     ["660766997", "Mahatma", "Gandhi", "amimojo@live.com", "5424782483", "1954-12-01", "economy"],
                //     ["101504778", "Nelson", "Mandela", "mastinfo@sbcglobal.net", "4745631773", "1955-09-02", "business"],
                //     ["468030914", "Winston", "Churchill", "fhirsch@att.net", "0969271842", "1956-08-03", "business"],
                //     ["174993265", "Abraham", "Lincoln", "bryanw@aol.com", "2236948455", "1957-07-04", "business"],
                //     ["776866417", "Mother", "Teresa", "trieuvan@aol.com", "9018024620", "1958-06-05", "business"],
                //     ["925690753", "Napoleon", "Bonaparte", "kodeman@me.com", "5444224219", "1959-05-06", "business"],
                //     ["955143661", "George", "Washington", "bsikdar@yahoo.com", "2329523709", "1960-04-07", "business"],
                //     ["974206547", "Dalai", "Lama", "rnelson@icloud.com", "6798690113", "1961-03-08", "business"],
                //     ["114045946", "Julias", "Caesar", "raides@mac.com", "5134170963", "1972-02-09", "business"],
                //     ["580387934", "Franklin", "Roosevelt", "priv1can@live.com", "8512473401", "1983-01-11", "business"]
                // ];

                //makeBooking(client, flight_nos, economySeats, businessSeats, discount_code, card_no, passengersInfo) 
                //flight_nos is an array containing 1 or more flight_no (>1 for bookings with connecting flights)
                //passengersInfo is an array of arrays where each internal array has [passport_no, first_name, last_name, email_address, phone_no, DOB, seatClass]
                await makeBooking(client, flight_nos, economySeats, businessSeats, discount_code, card_no, passengersInfo);
                res.json("Ending Correctly");
                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
                console.log("Disconneced");
                console.log("Process ending");
                res.json(e.detail);
                process.exit();
            }

        }

        //**update base_amount old code */           
        // var getBase = `SELECT economy_seats, business_seats, economy_base_amt, business_base_amt FROM bookings WHERE book_ref = ${i};`;
        // var base = await client.query(getBase);
        // //console.log(base);
        // base = base.rows;
        // console.log("test1",base);
        // console.log("test2",base[0]);
        // var economy_seats = base[0]["economy_seats"];
        // var business_seats = base[0]["business_seats"];
        // var economy_base_amt = base[0]["economy_base_amt"];
        // var business_base_amt = base[0]["business_base_amt"];
        // var base_amount = economy_seats*economy_base_amt + business_seats*business_base_amt;
        // await client.query(`UPDATE bookings SET base_amount = ${base_amount} WHERE book_ref = ${i};`) 

        //**update total_amount */
        // var base_amount_and_discount_code = await client.query(`SELECT base_amount, discount_code from bookings WHERE book_ref = ${i};`);
        // base_amount_and_discount_code = base_amount_and_discount_code.rows;
        // var discount_factor = await client.query(`SELECT discount_factor from discounts WHERE discount_code = '${base_amount_and_discount_code[0]["discount_code"]}';`);
        // discount_factor = discount_factor.rows;
        // var discounted_amount = base_amount_and_discount_code[0]["base_amount"] * discount_factor[0]["discount_factor"];
        // var taxes = discounted_amount*0.0825;
        // var total_amount = discounted_amount*1.0825;
        // await client.query(`UPDATE bookings SET discounted_amount = ${discounted_amount}, taxes = ${taxes}, total_amount=${total_amount} WHERE book_ref= ${i};`);

        async function makeBooking(client, flight_nos, economySeats, businessSeats, discount_code, card_no, passengersInfo)
        //flight_nos is an array containing 1 or more flight_no (>1 for bookings with connecting flights)
        //passengersInfo is an array of arrays where each internal array has [passport_no, first_name, last_name, email_address, phone_no, dob, seatClass]
        {
            try {

                await client.query("BEGIN;\r\r"); //start our transaction
                fs.appendFileSync("transaction.sql", "//Begin transaction for populating booking transaction//\r\rBEGIN;\r\r", function (err) {
                    console.log(err);
                });
                //for each flight_no in flight_nos
                for (let i = 0; i < flight_nos.length; ++i) {
                    let flight_no = flight_nos[i];
                    //1st: let's check that there's still space on that flight and reserve space if there is space
                    var available_seats = await client.query(
                        `SELECT available_economy_seats, available_business_seats\r
                    FROM flights\r
                    WHERE flight_no = ${flight_no};\r\r`);
                    fs.appendFileSync("transaction.sql", "//Check if there's enough space on flight//\r\r" + available_seats, function (err) {
                        console.log(err);
                    });
                    var available_economy_seats = available_seats.rows[0]["available_economy_seats"];
                    var available_business_seats = available_seats.rows[0]["available_business_seats"];
                    if (economySeats > available_economy_seats || businessSeats > available_business_seats) {
                        throw ("Not enough available seats"); //the catch will issue the ROLLBACK command to the database
                    }
                    //now reserve space on that flight by appropriately decrementing the availabe_seats
                    if (economySeats > 0)
                        await client.query(
                            `UPDATE flights
                        SET available_economy_seats = available_economy_seats - ${economySeats}
                        WHERE flight_no = ${flight_no};`
                        );
                    fs.appendFileSync("transaction.sql", "UPDATE flights\rSET available_economy_seats = available_economy_seat - ${economySeats}\rWHERE flight_no = ${flight_no};\r\r", function (err) {
                        console.log(err);
                    });
                    if (businessSeats > 0)
                        await client.query(
                            `UPDATE flights
                        SET available_business_seats = available_business_seats - ${businessSeats}
                        WHERE flight_no = ${flight_no};`
                        );
                    fs.appendFileSync("transaction.sql", "UPDATE flights\rSET available_business_seats = available_business_seat - ${businessSeats}\rWHERE flight_no = ${flight_no};\r\r", function (err) {
                        console.log(err);
                    });

                }

                //2nd: let's add the booking to bookings
                //by starting with an insert statement this will fill in columns with default values (book_ref, booking_time)
                //insert into economy_seats, business_seats, discount_code, card_no
                //leaves base_amount, discounted_amount, taxes, and total_amount to be updated later
                await client.query(
                    `INSERT INTO bookings (economy_seats, business_seats, discount_code, card_no)
                VALUES (${economySeats},${businessSeats},'${discount_code}',${card_no});`
                );
                fs.appendFileSync("transaction.sql", "//Insert into bookings table//\r\rINSERT INTO bookings (economy_seats, business_seats, discount_code, card_no)\rVALUES (${economySeats},${businessSeats},'${discount_code}',${card});\r\r", function (err) {
                    console.log(err);
                });
                //in order to update we need to figure out which book_ref we're working on - the highest book_ref should be the one we just made in the above insert
                var book_ref = await client.query(`SELECT MAX(book_ref) AS mbr FROM bookings;`);
                fs.appendFileSync("transaction.sql", "//Figure out which book_ref is being worked on//\r\r" + book_ref, function (err) {
                    console.log(err);
                });
                book_ref = book_ref.rows[0]["mbr"];
                //in order to update base_amount, discounted_amount, taxes, and total_amount we first need to do math for prices
                //get base costs
                var seat_class_costs = await client.query("SELECT economy_cost, business_cost\rFROM seat_class_costs;\r\r");
                fs.appendFileSync("transaction.sql", "//Calculate base costs//\r\r" + seat_class_costs, function (err) {
                    console.log(err);
                });
                seat_class_costs = seat_class_costs.rows;
                var economy_base_cost = seat_class_costs[0]["economy_cost"];
                var business_base_cost = seat_class_costs[0]["business_cost"];
                var base_amount = economySeats * economy_base_cost + businessSeats * business_base_cost;
                //get discount_factor
                var discount_factor = await client.query(
                    `SELECT discount_factor\r
                FROM discounts\r
                WHERE discount_code = '${discount_code}';\r\r`);
                fs.appendFileSync("transaction.sql", "//Get discount_factor//\r\r" + discount_factor, function (err) {
                    console.log(err);
                });
                discount_factor = discount_factor.rows[0]["discount_factor"];
                //get discounted_amount
                var discounted_amount = discount_factor * base_amount;
                //taxes
                var taxes = 0.0825 * discounted_amount;
                //total_amount
                var total_amount = 1.0825 * discounted_amount;
                //update base_amount, discounted_amount, taxes, and total_amount 
                await client.query(
                    `UPDATE bookings\r
                SET base_amount=${base_amount},
                    discounted_amount=${discounted_amount},
                    taxes=${taxes},
                    total_amount=${total_amount}\r
                WHERE book_ref = ${book_ref};\r\r`
                );
                fs.appendFileSync("transaction.sql", "//Update bookings with base_amount, discounted_amount, total_amount//\r\r", function (err) {
                    console.log(err);
                });
                for (let i = 0; i < passengersInfo.length; ++i) {
                    //passengersInfo is an array of arrays where each internal array has [passport_no, first_name, last_name, email_address, phone_no, dob, seatClass]
                    var passport_no = passengersInfo[i][0];
                    var first_name = passengersInfo[i][1];
                    var last_name = passengersInfo[i][2];
                    var email_address = passengersInfo[i][3];
                    var phone_no = passengersInfo[i][4];
                    var dob = passengersInfo[i][5];
                    var seatClass = passengersInfo[i][6];

                    //3rd: let's do passengers
                    await client.query(
                        `INSERT INTO passengers
                VALUES ('${passport_no}','${first_name}','${last_name}','${email_address}','${phone_no}', CAST('${dob}' AS DATE))
                ON CONFLICT (passport_no) DO UPDATE
                    SET first_name = '${first_name}', last_name = '${last_name}', email_address = '${email_address}', phone_no = '${phone_no}', dob = CAST('${dob}' AS DATE)
                    WHERE passengers.passport_no = '${passport_no}';`
                    );
                    fs.appendFileSync("transaction.sql", "//Insert into passengers//\r\rINSERT INTO passengers\rVALUES ('${passport_no}','${first_name}','${last_name}','${email_address}','${phone_no}', CAST('${dob}' AS DATE))\rON CONFLICT (passport_no) DO UPDATE\rSET first_name = '${first_name}', last_name = '${last_name}', email_address = '${email_address}', phone_no = '${phone_no}', dob = CAST('${dob}' AS DATE)\rWHERE passengers.passport_no = '${passport_no}';\r\r", function (err) {
                        console.log(err);
                    });
                    //4th: lets do passengers_bookings
                    await client.query(
                        `INSERT INTO passengers_bookings
                VALUES ('${passport_no}',${book_ref});`
                    );
                    fs.appendFileSync("transaction.sql", "//Insert into passengers_bookings//\r\rINSERT INTO passengers_bookings\rVALUES ('${passport_no}',${book_ref});\r\r", function (err) {
                        console.log(err);
                    });
                    //5th: let's do tickets
                    //INSERT INTO SELECT coupled with given values: https://stackoverflow.com/questions/25969/insert-into-values-select-from
                    for (let i = 0; i < flight_nos.length; ++i) {
                        let flight_no = flight_nos[i];
                        await client.query(
                            `INSERT INTO tickets (depart_time, seat_class, book_ref, passport_no, flight_no)
                        SELECT departure_time, '${seatClass}', ${book_ref}, '${passport_no}', ${flight_no}
                            FROM flights 
                            WHERE flight_no = ${flight_no};`
                        );
                        fs.appendFileSync("transaction.sql", "//Insert into tickets table//\r\rINSERT INTO tickets (depart_time, seat_class, book_ref, passport_no, flight_no)\rSELECT departure_time, '${seatClass}', ${book_ref}, '${passport_no}', ${flight_no}\rFROM flights\rWHERE flight_no = ${flight_no};\r\r", function (err) {
                            console.log(err);
                        });
                    }
                }

                //la fin 
                await client.query("COMMIT;");
                fs.appendFileSync("transaction.sql", "COMMIT;\r\r", function (err) {
                    console.log(err);
                });
            } catch (e) {
                await client.query("ROLLBACK;");
                fs.appendFileSync("transaction.sql", "ROLLBACK;\r\r", function (err) {
                    console.log(err);
                });
                throw (e); //will bypass the "Ending Correctly" throw
            }
        }
    });
};