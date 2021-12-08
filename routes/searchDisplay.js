module.exports = app => {
    app.post('/search-flight/flights', async (req, res) => {
        main(req.body.departure_date, req.body.departureCity, req.body.arrivalCity, req.body.numPassenger, req.body.seatClass);
        
        async function main(departure_date, departure_city, arrival_city, passengerNum, seat_class) {
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

                await findFlight(client, departure_date, departure_city, arrival_city, passengerNum, seat_class);

                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
                client.end();
            }
        }


        async function fetchCities() {
            let distinctCities = await client.query(
                `select distinct(city_name) from airport_cities;`
            );
            distinctCities = distinctCities.rows;
            for (let i = 0; i < distinctCities.length; ++i)
                distinctCities[i] = Object.values(distinctCities[i]);
            return distinctCities;
        }


        async function findFlight(client, departure_date, departure_city, arrival_city, passengerNum, seat_class) {
            //seat field name 
            // econ_price or bus_price 
            let price = (seat_class == 'business') ? 'bus_price' : 'econ_price';
            let available_seats = (seat_class == 'business') ? 'available_business_seats' : 'available_economy_seats';
            try {
                async function clientQueryAndWriteToTransactionSQL(client, transactionStr)
                {
                    fs.appendFileSync("./Client/public/query.sql", transactionStr+"\r", function (err) {
                        console.log(err);
                    });
                    return await client.query(transactionStr);
                }
                fs.appendFileSync("./Client/public/query.sql", `\r\r--The following sql statements are part of the query for findFlight(client, ${departure_date}, ${departure_city}, ${arrival_city}, ${passengerNum}, ${seat_class})\r`, function (err) {
                    console.log(err);
                });
                var flightInfo = await clientQueryAndWriteToTransactionSQL(client,
`SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.${price}                              AS price,
        f.${available_seats}                    AS available_seats,
        AGE( f.arrival_time, f.departure_time)  AS elapsedTime, 
        0                                       AS stop,
        d.city_name                             AS departureCity, 
        f.departure_airport_code                AS departureAirPortCode,
        a.city_name                             AS arrivalCity, 
        f.arrival_airport_code                  AS arrivalAirPortCode,
        NULL                                    AS flight_no2, 
        NULL                                    AS departure_time2, 
        NULL                                    AS arrival_time2,
        NULL                                    AS price2,
        NULL                                    AS available_seats2,
        NULL                                    AS elapsedTime2,
        AGE(f.arrival_time, f.departure_time)   AS totalElapsedTime,
        NULL                                    AS departureCity2, 
        NULL                                    AS departureAirPortCode2,
        NULL                                    AS arrivalCity2, 
        NULL                                    AS arrivalAirPortCode2
FROM flights                                    AS f
        INNER JOIN airport_cities               AS d 
            ON f.departure_airport_code = d.airport_code
        INNER JOIN airport_cities               AS a 
            ON f.arrival_airport_code = a.airport_code
WHERE d.city_name = '${departure_city}' 
                AND a.city_name = '${arrival_city}'
                AND DATE(f.departure_time) = '${departure_date}'
                AND f.${available_seats} >= '${passengerNum}'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.${price}                                 AS price,
        f1.${available_seats}                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.${price}                                 AS price2,
        f2.${available_seats}                       AS available_seats2,
        AGE(f2.arrival_time, f2.departure_time)     AS elapsedTime2,
        AGE(f2.arrival_time, f1.departure_time)     AS totalElapsedTime,
        m.city_name                                 AS departureCity2, 
        f2.departure_airport_code                   AS departureAirPortCode2,
        a.city_name                                 AS arrivalCity2, 
        f2.arrival_airport_code                     AS arrivalAirPortCode2
FROM flights AS f1
        INNER JOIN flights                          AS f2 
            ON f1.arrival_airport_code = f2.departure_airport_code 
                AND f1.departure_airport_code != f2.departure_airport_code 
        INNER JOIN airport_cities                   AS d 
            ON f1.departure_airport_code = d.airport_code
        INNER JOIN airport_cities                   AS a 
            ON f2.arrival_airport_code = a.airport_code
        INNER JOIN airport_cities                   AS m 
            ON f2.departure_airport_code = m.airport_code
WHERE d.city_name = '${departure_city}' 
                AND a.city_name = '${arrival_city}' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '${departure_date}' 
                AND (f1.${available_seats}) >= '${passengerNum}' 
                AND (f2.${available_seats}) >= '${passengerNum}' 
    ORDER BY 7,2 ASC
    LIMIT 20;`
                );
                console.log(await flightInfo.rows);
                res.json(flightInfo.rows);
            } catch (e) {
                console.log (e); //will bypass the "Ending Correctly" throw
            }

        }

    });
};
// 

// for test 


// `SELECT f.flight_no, f.departure_time, f.arrival_time, f.econ_price AS price,
//                 f.available_economy_seats AS available_seats,
//                 AGE( f.arrival_time, f.departure_time) as elapsedTime, 0 as stop,
//                 d.city_name as departureCity, f.departure_airport_code as departureAirPortCode,
//                 a.city_name as arrivalCity, f.arrival_airport_code as arrivalAirPortCode,

//                 NULL as flight_no2, NULL as departure_time2, NULL as arrival_time2,
//                 NULL as price2,
//                 NULL as available_seats2,
//                 NULL as elapsedTime2,

//                 AGE(f.arrival_time, f.departure_time) as totalElapsedTime,

//                 NULL as departureCity2, NULL as departureAirPortCode2,
//                 NULL as arrivalCity2, NULL as arrivalAirPortCode2

//                 FROM flights AS f
//                 INNER JOIN airport_cities as d ON f.departure_airport_code = d.airport_code
//                 INNER JOIN airport_cities as a ON f.arrival_airport_code = a.airport_code
//                 WHERE d.city_name = 'Houston' AND a.city_name = 'Seattle'
//                     AND  DATE(f.departure_time) = '2021-12-2'
//                     AND f.available_economy_seats >= '2'

//                 UNION ALL

//                 SELECT f1.flight_no, f1.departure_time, f1.arrival_time,
//                 f1.econ_price AS price,
//                 f1.available_economy_seats AS available_seats,
//                 AGE(f1.arrival_time, f1.departure_time) as totalElapsedTime, 1 as stop,
//                 d.city_name as departureCity, f1.departure_airport_code as departureAirPortCode,
//                 m.city_name as arrivalCity, f1.arrival_airport_code as arrivalAirPortCode,

//                 f2.flight_no, f2.departure_time, f2.arrival_time,
//                 f2.econ_price AS price2,
//                 f2.available_economy_seats AS available_seats2,
//                 AGE(f2.arrival_time, f2.departure_time) as elapsedTime2,

//                 AGE(f2.arrival_time, f1.departure_time) as totalElapsedTime,
//                 m.city_name as departureCity2, f2.departure_airport_code as departureAirPortCode2,
//                 a.city_name as arrivalCity2, f2.arrival_airport_code as arrivalAirPortCode2

//                 FROM flights AS f1
//                 INNER JOIN flights AS f2 ON
//                     f1.arrival_airport_code = f2.departure_airport_code AND
//                     f1.departure_airport_code != f2.departure_airport_code
//                 INNER JOIN airport_cities as d ON f1.departure_airport_code = d.airport_code
//                 INNER JOIN airport_cities as a ON f2.arrival_airport_code = a.airport_code
//                 INNER JOIN airport_cities as m ON f2.departure_airport_code = m.airport_code
//                 WHERE d.city_name = 'Houston' AND a.city_name = 'Seattle' AND
//                     f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') AND
//                     f2.departure_time < (f1.arrival_time + INTERVAL '18 Hour') AND
//                     DATE(f1.departure_time) = '2021-12-2' AND
//                     (f1.available_economy_seats) >= '2' AND
//                     (f2.available_economy_seats) >= '2'
//                 ORDER BY 7,2 ASC
//                 LIMIT 20;`


/*
 SELECT f1.arrival_time, f1.arrival_time + INTERVAL '12 Hour', f2.departure_time
                
                FROM flights AS f1
                INNER JOIN flights AS f2 ON
f1.arrival_airport_code = f2.departure_airport_code AND
f1.departure_airport_code != f2.departure_airport_code
                INNER JOIN airport_cities as d ON f1.departure_airport_code = d.airport_code
                INNER JOIN airport_cities as a ON f2.arrival_airport_code = a.airport_code
                INNER JOIN airport_cities as m ON f2.departure_airport_code = m.airport_code
                WHERE d.city_name = 'Houston' AND a.city_name = 'Seattle' AND
f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') AND
f2.departure_time < (f1.arrival_time + INTERVAL '8 Hour')
order by 2 DESC;
      */