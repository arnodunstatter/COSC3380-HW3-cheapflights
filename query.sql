

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
