--The following sql statements are part of the query for loginDisplayTickets(client, helloworld@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'helloworld@gmail.com';--The following sql statements are part of the query for loginDisplayTickets(client, helloworld@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'helloworld@gmail.com';SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)--The following sql statements are part of the query for loginDisplayTickets(client, helloworld@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'helloworld@gmail.com';SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)--The following sql statements are part of the query for loginDisplayTickets(client, helloworld@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'helloworld@gmail.com';SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)SELECT *
FROM boarding_passes
WHERE ticket_no = 245;--The following sql statements are part of the query for for getBoardingPass(client,245)--The following sql statements are part of the query for fetchCities(client)SELECT DISTINCT(city_name) 
FROM airport_cities;--The following sql statements are part of the query for fetchCities(client)SELECT DISTINCT(city_name) 
FROM airport_cities;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Taipei, Los Angeles, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Los Angeles'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Los Angeles' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Taipei, Madrid, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Madrid'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Madrid' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Taipei, Madrid, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Madrid'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Madrid' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Taipei, Los Angeles, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Los Angeles'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Los Angeles' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Madrid, London, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Madrid' 
                AND a.city_name = 'London'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Madrid' 
                AND a.city_name = 'London' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for fetchCities(client)SELECT DISTINCT(city_name) 
FROM airport_cities;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Taipei, Los Angeles, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Los Angeles'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Los Angeles' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for fetchCities(client)SELECT DISTINCT(city_name) 
FROM airport_cities;--The following sql statements are part of the query for findFlight(client, 2021-12-8, Taipei, Madrid, 1, economy)SELECT  f.flight_no,
        f.departure_time, 
        f.arrival_time, 
        f.econ_price                              AS price,
        f.available_economy_seats                    AS available_seats,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Madrid'
                AND DATE(f.departure_time) = '2021-12-8'
                AND f.available_economy_seats >= '1'
                
UNION ALL

SELECT  f1.flight_no, 
        f1.departure_time, 
        f1.arrival_time, 
        f1.econ_price                                 AS price,
        f1.available_economy_seats                       AS available_seats,
        AGE(f1.arrival_time, f1.departure_time)     AS totalElapsedTime, 
        1                                           AS stop,
        d.city_name                                 AS departureCity, 
        f1.departure_airport_code                   AS departureAirPortCode,
        m.city_name                                 AS arrivalCity, 
        f1.arrival_airport_code                     AS arrivalAirPortCode,
        f2.flight_no, 
        f2.departure_time, 
        f2.arrival_time, 
        f2.econ_price                                 AS price2,
        f2.available_economy_seats                       AS available_seats2,
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
WHERE d.city_name = 'Taipei' 
                AND a.city_name = 'Madrid' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-8' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;--The following sql statements are part of the query for loginDisplayTickets(client, sup@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'sup@gmail.com';SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)--The following sql statements are part of the query for loginDisplayTickets(client, sup@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'sup@gmail.com';SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)--The following sql statements are part of the query for loginDisplayTickets(client, sup@gmail.com)SELECT t.ticket_no, 
        f.flight_no, 
        plane.aircraft_code, 
        plane.aircraft_name, 
        p.passport_no, 
        dep.airport_code            AS departure_airport_code, 
        dep.airport_name            AS departure_airport_name, 
        f.departure_time, 
        b.canceled, 
        dep.city_name               AS departing_city, 
        dep.country                 AS departing_country, 
        arr.airport_code            AS arrival_airport_code, 
        arr.airport_name            AS arrival_airport_name, 
        f.arrival_time, 
        arr.city_name               AS arrival_city, 
        arr.country                 AS arrival_country, 
        t.seat_class, 
        b.book_ref, 
        b.total_amount 
FROM tickets                        AS t
    LEFT JOIN bookings              AS b USING(book_ref)
    LEFT JOIN flights               AS f USING(flight_no)
    LEFT JOIN airport_cities        AS arr 
        ON arr.airport_code = f.arrival_airport_code
    LEFT JOIN airport_cities        AS dep 
        ON dep.airport_code = f.departure_airport_code
    LEFT JOIN passengers            AS p USING(passport_no)
    LEFT JOIN aircraft              AS plane USING(aircraft_code)
WHERE email_address = 'sup@gmail.com';SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)SELECT *
FROM boarding_passes
WHERE ticket_no = 249;--The following sql statements are part of the query for for getBoardingPass(client,249)--The following sql statements are part of the query for fetchCities(client)SELECT DISTINCT(city_name) 
FROM airport_cities;