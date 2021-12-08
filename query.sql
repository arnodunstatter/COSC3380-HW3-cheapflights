--The following sql statements are part of the query for findFlights(client, 2021-12-01, Houston, Madrid)


SELECT airport_code
FROM airport_cities
WHERE city_name = 'Houston';
SELECT airport_code
FROM airport_cities
WHERE city_name = 'Madrid';
SELECT flight_no
FROM flights
WHERE departure_airport_code = 'IAH' 
    AND arrival_airport_code = 'TOJ' 
    AND DATE(departure_time) = '2021-12-01';
SELECT f1.flight_no AS flight_no_1, f2.flight_no AS flight_no_2
FROM flights AS f1
JOIN flights AS f2
    ON f1.arrival_airport_code = f2.departure_airport_code
WHERE f2.departure_time > f1.arrival_time 
    AND f1.departure_airport_code = 'IAH' 
    AND f2.arrival_airport_code = 'TOJ' 
    AND DATE(f1.departure_time) = '2021-12-01'
    ORDER BY f2.departure_time ASC
    LIMIT 20;


--The following sql statements are part of the query for displayWaitList(client, 1)


SELECT book_ref, ticket_no, passport_no, flight_no 
FROM passengers LEFT JOIN tickets USING(passport_no) 
WHERE ticket_no = 1
SELECT * 
FROM economy_waitlist 
WHERE flight_no = 4918;
SELECT * 
FROM business_waitlist 
WHERE flight_no = 4918;


--The following sql statements are part of the query for loginDisplayTickets(client, james_jameson@hotmail.org)


SELECT t.ticket_no, f.flight_no, plane.aircraft_code, plane.aircraft_name, p.passport_no, dep.airport_code AS departure_airport_code, dep.airport_name AS departure_airport_name, f.departure_time,
            dep.city_name AS departing_city, dep.country AS departing_country, arr.airport_code AS arrival_airport_code, arr.airport_name AS arrival_airport_name, f.arrival_time, arr.city_name AS arrival_city,
            arr.country AS arrival_country, t.seat_class, b.book_ref, b.total_amount
FROM tickets AS t
LEFT JOIN bookings AS b USING(book_ref)
LEFT JOIN flights AS f USING(flight_no)
LEFT JOIN airport_cities AS arr ON arr.airport_code = f.arrival_airport_code
LEFT JOIN airport_cities AS dep ON dep.airport_code = f.departure_airport_code
LEFT JOIN passengers AS p USING(passport_no)
LEFT JOIN aircraft AS plane USING(aircraft_code)
WHERE email_address = 'james_jameson@hotmail.org';




--The following sql statements are part of the query for findFlight(client, 2021-12-9, Houston, Madrid, 1, economy)

SELECT  f.flight_no,
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
WHERE d.city_name = 'Houston' 
                AND a.city_name = 'Madrid'
                AND DATE(f.departure_time) = '2021-12-9'
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
WHERE d.city_name = 'Houston' 
                AND a.city_name = 'Madrid' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-9' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;


--The following sql statements are part of the query for findFlight(client, 2021-12-10, Madrid, Houston, 1, economy)
SELECT  f.flight_no,
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
                AND a.city_name = 'Houston'
                AND DATE(f.departure_time) = '2021-12-10'
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
                AND a.city_name = 'Houston' 
                AND f2.departure_time > (f1.arrival_time + INTERVAL '1 Hour') 
                AND f2.departure_time < (f1.arrival_time + INTERVAL '6 Hour') 
                AND DATE(f1.departure_time) = '2021-12-10' 
                AND (f1.available_economy_seats) >= '1' 
                AND (f2.available_economy_seats) >= '1' 
    ORDER BY 7,2 ASC
    LIMIT 20;
