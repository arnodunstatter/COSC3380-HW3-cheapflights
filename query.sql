
                dep.city_name AS departing_city, dep.country AS departing_country, arr.airport_code AS arrival_airport_code, arr.airport_name AS arrival_airport_name, f.arrival_time, arr.city_name AS arrival_city, 
                arr.country AS arrival_country, t.seat_class, b.book_ref, b.total_amount 
                FROM tickets AS t
                LEFT JOIN bookings AS b USING(book_ref)
                LEFT JOIN flights AS f USING(flight_no)
                LEFT JOIN airport_cities AS arr ON arr.airport_code = f.arrival_airport_code
                LEFT JOIN airport_cities AS dep ON dep.airport_code = f.departure_airport_code
                LEFT JOIN passengers AS p USING(passport_no)
                LEFT JOIN aircraft AS plane USING(aircraft_code)
                WHERE email_address = 'vvanniekerk4z@cloudflare.com';
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
                dep.city_name AS departing_city, dep.country AS departing_country, arr.airport_code AS arrival_airport_code, arr.airport_name AS arrival_airport_name, f.arrival_time, arr.city_name AS arrival_city, 
                arr.country AS arrival_country, t.seat_class, b.book_ref, b.total_amount 
                FROM tickets AS t
                LEFT JOIN bookings AS b USING(book_ref)
                LEFT JOIN flights AS f USING(flight_no)
                LEFT JOIN airport_cities AS arr ON arr.airport_code = f.arrival_airport_code
                LEFT JOIN airport_cities AS dep ON dep.airport_code = f.departure_airport_code
                LEFT JOIN passengers AS p USING(passport_no)
                LEFT JOIN aircraft AS plane USING(aircraft_code)
                WHERE email_address = 'vvanniekerk4z@cloudflare.com';
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;
FROM boarding_passes
WHERE ticket_no = 224;