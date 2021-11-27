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
        try{ //creates entries in bookings, tickets, passengers, and passengers_bookings and updates available_seats in flights
            //the following values will be input by user in the web-form
            var flight_no = "4919"; //this will be 'input' by the user by them selecting a viable flight after they specify the whens and wheres
            var seatClass = "economy";
            var economySeats = 1;
            var businessSeats = 0;
            var passport_no = "849756812";
            var first_name = "Dave";
            var last_name = "Davidson";
            var email_address = "dave_davidson@hotmail.org";
            var phone_no = "1234567890";
            var DOB = "1986-12-22";
            var discount_code = "none";
            var card_no = "1111222233334444";
            
            
            await client.query("BEGIN;"); //start our transaction
            
            //1st: let's check that there's still space on that flight and reserve space if there is space
            var available_seats = await client.query(
                `SELECT available_economy_seats, available_business_seats
                    FROM flights
                    WHERE flight_no = ${flight_no};`);
            var available_economy_seats = available_seats.rows[0]["available_economy_seats"];
            var available_business_seats = available_seats.rows[0]["available_business_seats"];
            if (economySeats > available_economy_seats || businessSeats > available_business_seats)
            {
                await client.query("ROLLBACK;");
                throw ("Not enough available seats");
            }
                //now reserve space on that flight by appropriately decrementing the availabe_seats
            for (let i = 0; i < economySeats; ++i)
            {
                await client.query(
                    `UPDATE flights
                        SET available_economy_seats = available_economy_seats - 1
                        WHERE flight_no = ${flight_no};`
                );
            }
            for (let i = 0; i < businessSeats; ++i)
            {
                await client.query(
                    `UPDATE flights
                        SET available_business_seats = available_business_seats - 1
                        WHERE flight_no = ${flight_no};`
                );
            }
            
            //2nd: let's add the booking to bookings
                //by starting with an insert statement this will fill in columns with default values (book_ref, booking_time)
                //insert into economy_seats, business_seats, discount_code, card_no
                //leaves base_amount, discounted_amount, taxes, and total_amount to be updated later
            console.log(`INSERT INTO bookings (economy_seats, business_seats, discount_code, card_no)
            VALUES (${economySeats},${businessSeats},${discount_code},${card_no});`);
            await client.query(
                `INSERT INTO bookings (economy_seats, business_seats, discount_code, card_no)
                    VALUES (${economySeats},${businessSeats},'${discount_code}',${card_no});`
            );
                //in order to update we need to figure out which book_ref we're working on - the highest book_ref should be the one we just made in the above insert
            var book_ref = await client.query(`SELECT MAX(book_ref) AS mbr FROM bookings;`);
            book_ref = book_ref.rows[0]["mbr"];
                //in order to update base_amount, discounted_amount, taxes, and total_amount we first need to do math for prices
                    //get base costs
            var seat_class_costs = await client.query("SELECT economy_cost, business_cost FROM seat_class_costs;"); 
            seat_class_costs = seat_class_costs.rows;
            var economy_base_cost = seat_class_costs[0]["economy_cost"];
            var business_base_cost = seat_class_costs[0]["business_cost"];
            var base_amount = economySeats*economy_base_cost + businessSeats*business_base_cost;           
                    //get discount_factor
            var discount_factor = await client.query(
                `SELECT discount_factor
                    FROM discounts
                    WHERE discount_code = '${discount_code}';`);
            discount_factor = discount_factor.rows[0]["discount_factor"];
                    //get discounted_amount
            var discounted_amount = discount_factor*base_amount;
                    //taxes
            var taxes = 0.0825*discounted_amount;
                    //total_amount
            var total_amount = 1.0825*discounted_amount;
                //update base_amount, discounted_amount, taxes, and total_amount 
            await client.query(
                `UPDATE bookings
                    SET base_amount=${base_amount},
                        discounted_amount=${discounted_amount},
                        taxes=${taxes},
                        total_amount=${total_amount}
                    WHERE book_ref = ${book_ref};`
            );

            //3rd: let's do passengers
            await client.query(
                `INSERT INTO passengers
                VALUES ('${passport_no}','${first_name}','${last_name}','${email_address}','${phone_no}', CAST('${DOB}' AS DATE));`
            );
            
            //4th: lets do passengers_bookings
            await client.query(
                `INSERT INTO passengers_bookings
                VALUES ('${passport_no}',${book_ref});`
            );
            
            //5th: let's do tickets
                //INSERT INTO SELECT coupled with given values: https://stackoverflow.com/questions/25969/insert-into-values-select-from
            await client.query(
                `INSERT INTO tickets (depart_time, seat_class, book_ref, passport_no, flight_no)
                    SELECT departure_time, '${seatClass}', ${book_ref}, '${passport_no}', ${flight_no}
                        FROM flights 
                        WHERE flight_no = ${flight_no};`
            );

                    
            //la fin 
            await client.query("COMMIT;");
        }
        catch(e)
        {
            await client.query("ROLLBACK;");
            throw(e); //will bypass the "Ending Correctly" throw
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

async function makeBooking()
{
    
}