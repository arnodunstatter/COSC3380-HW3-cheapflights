main();

async function main()
{
        //now we make our client using our creds
        const { Client } = require('pg');
        const creds = require('./creds.json');
        const client = new Client(creds);

        try{
            try{
                client.connect();

            }catch(e){console.log("Problem connecting client"); throw(e);}

            const fs = require('fs');



            // var queryStr = "SELECT * FROM passengers;";
            // var columns = ["passport_no", "first_name", "last_name", "email_address", "phone_no", "DOB"];
            // var passengers = await client.query(queryStr);
            // passengers_info = [];
            // for(let i = 0; i < passengers.rows.length; ++i)
            // {
            //     passenger_info = [];
            //     for(let col = 0; col < columns.length; ++col)
            //     {
            //         passenger_info.push(passengers.rows[i][columns[col]]);
            //     }
            //     passengers_info.push(passenger_info);
            // }

            var bookings = [ 
                [1, 0, 450, 'none', '9846578935216446'],
                [1, 0, 550, 'none', '8585646413245768'],
                [1, 0, 400, 'none', '7685948438286715'],
                [0, 1, 420, 'happy', '0694206942069420'],
                [1, 0, 600, 'none', '4351267894947456'],
                [1, 0, 500, 'none', '9475268122661584'],
                [1, 0, 900, 'emp15', '9468513297451616'],
                [1, 0, 600, 'mil10', '6543219871546200'],
                [1, 0, 475, 'none', '5162849586754253'],
                [1, 0, 450, 'none', '1575488659536565']
            ];

            for (let i = 0; i < bookings.length; ++i)
            {
                let e_s = bookings[i][0];
                let b_s = bookings[i][1];
                let b_a = bookings[i][2];
                let d_c = bookings[i][3];
                let c_n = bookings[i][4];
                var booking= 
                `INSERT INTO bookings (economy_seats, business_seats, base_amount, discount_code, discounted_amount, taxes, total_amount, card_no)
                    VALUES (${e_s}, ${b_s}, ${b_a}, '${d_c}',
                        ${b_a}*(SELECT discount_factor FROM discounts WHERE discount_code = '${d_c}'),
                        0.0825*${b_a}*(SELECT discount_factor FROM discounts WHERE discount_code = '${d_c}'),
                        0.0825*${b_a}*(SELECT discount_factor FROM discounts WHERE discount_code = '${d_c}') + ${b_a}*(SELECT discount_factor FROM discounts WHERE discount_code = '${d_c}'),
                        '${c_n}'
                        );`;    
                await client.query(booking);
                console.log(`INSERT ${i+1} executed`);
            }

            throw("Ending Correctly");
        }
        catch(e)
        {
            console.error(e);
            client.end();
            console.log("Disconneced");
            console.log("Process ending");
            process.exit();
        }

}
