--The following sql statements are part of the transaction for makeBooking(client, 5098, 1, 0, none, 123123123, 123123,Gabriel,Cruz,sup@gmail.com,8326209310,2003-12-08,economy)BEGIN;SELECT available_economy_seats, available_business_seats
    FROM flights
    WHERE flight_no = 5098;UPDATE flights
    SET available_economy_seats = available_economy_seats - 1
    WHERE flight_no = 5098;INSERT INTO bookings (economy_seats, business_seats, discount_code, card_no)
    VALUES (1,0,'none',123123123);SELECT MAX(book_ref) AS mbr 
    FROM bookings;SELECT economy_cost, business_cost
    FROM seat_class_costs;SELECT discount_factor
    FROM discounts
    WHERE discount_code = 'none';UPDATE bookings
    SET base_amount=500,
        discounted_amount=500,
        taxes=41.25,
        total_amount=541.25
    WHERE book_ref = 229;INSERT INTO passengers
    VALUES ('123123','Gabriel','Cruz','sup@gmail.com','8326209310', CAST('2003-12-08' AS DATE))
        ON CONFLICT (passport_no) DO UPDATE
            SET first_name = 'Gabriel', last_name = 'Cruz', email_address = 'sup@gmail.com', phone_no = '8326209310', dob = CAST('2003-12-08' AS DATE)
            WHERE passengers.passport_no = '123123';INSERT INTO passengers_bookings
    VALUES ('123123',229);INSERT INTO tickets (depart_time, seat_class, book_ref, passport_no, flight_no)
    SELECT departure_time, 'economy', 229, '123123', 5098
        FROM flights 
        WHERE flight_no = 5098;COMMIT;--The following sql statements are part of the transaction for checkIn(client,249, 0)BEGIN;INSERT INTO baggage_info(number_of_bags)
    VALUES(0);SELECT baggage_id
    FROM baggage_info
    ORDER BY baggage_id DESC 
    LIMIT 1;SELECT flight_no
    FROM tickets
    WHERE ticket_no = 249;SELECT seat_class
    FROM ticketsWHERE ticket_no = 249;SELECT COUNT(*)+1
    FROM boarding_passes
    LEFT JOIN tickets USING(ticket_no)
    WHERE tickets.flight_no = 5098AND seat_class = 'economy';SELECT CONCAT('E', 1);SELECT COUNT(*)+1
    FROM boarding_passes
    WHERE flight_no = 5098;SELECT departure_gate, baggage_claimFROM flightsWHERE flight_no = 5098;INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
    VALUES(249, 5098, 'E1',1,'B04','Z01',69684);COMMIT;