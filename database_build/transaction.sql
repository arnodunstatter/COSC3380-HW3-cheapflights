--The following sql statements are part of the transaction for makeBooking(client, 7437, 1, 0, none, 1594789622331515, 588970267,Shepherd,Aggio,saggio0@edublogs.org,552-967-7436,1993-04-26,economy)
BEGIN;
SELECT available_economy_seats, available_business_seats
    FROM flights
    WHERE flight_no = 7437;
UPDATE flights
    SET available_economy_seats = available_economy_seats - 1
    WHERE flight_no = 7437;
INSERT INTO bookings (economy_seats, business_seats, discount_code, card_no)
    VALUES (1,0,'none',1594789622331515);
SELECT MAX(book_ref) AS mbr 
    FROM bookings;
SELECT economy_cost, business_cost
    FROM seat_class_costs;
SELECT discount_factor
    FROM discounts
    WHERE discount_code = 'none';
UPDATE bookings
    SET base_amount=500,
        discounted_amount=500,
        taxes=41.25,
        total_amount=541.25
    WHERE book_ref = 227;
INSERT INTO passengers
    VALUES ('588970267','Shepherd','Aggio','saggio0@edublogs.org','552-967-7436', CAST('1993-04-26' AS DATE))
        ON CONFLICT (passport_no) DO UPDATE
            SET first_name = 'Shepherd', last_name = 'Aggio', email_address = 'saggio0@edublogs.org', phone_no = '552-967-7436', dob = CAST('1993-04-26' AS DATE)
            WHERE passengers.passport_no = '588970267';
INSERT INTO passengers_bookings
    VALUES ('588970267',227);
INSERT INTO tickets (depart_time, seat_class, book_ref, passport_no, flight_no)
    SELECT departure_time, 'economy', 227, '588970267', 7437
        FROM flights 
        WHERE flight_no = 7437;
COMMIT;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT economy_seats, business_seats, flight_no
    FROM bookings
        JOIN tickets
            ON bookings.book_ref = tickets.book_ref
        WHERE bookings.book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT economy_seats, business_seats, flight_no
    FROM bookings
        JOIN tickets
            ON bookings.book_ref = tickets.book_ref
        WHERE bookings.book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT economy_seats, business_seats, flight_no
    FROM bookings
        JOIN tickets
            ON bookings.book_ref = tickets.book_ref
        WHERE bookings.book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT economy_seats, business_seats, flight_no
    FROM bookings
        JOIN tickets
            ON bookings.book_ref = tickets.book_ref
        WHERE bookings.book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT economy_seats
    FROM tickets
    WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
SELECT economy_seats
    FROM bookings
    WHERE book_ref = 227;
SELECT available_business_seats
    FROM bookings
    WHERE book_ref = 227;
ROLLBACK;


--Begin transaction for cancellations for ${book_ref}--
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;
SELECT economy_seats
    FROM bookings
    WHERE book_ref = 227;
SELECT business_seats
    FROM bookings
    WHERE book_ref = 227;
UPDATE flights
    SET available_economy_seats = available_economy_seats + 1
    WHERE flight_no = 7437;
COMMIT;


--Begin transaction for cancellations for book ref: 227
BEGIN;
UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;
SELECT flight_no
    FROM tickets
    WHERE book_ref = 227;
SELECT economy_seats
    FROM bookings
    WHERE book_ref = 227;
SELECT business_seats
    FROM bookings
    WHERE book_ref = 227;
UPDATE flights
    SET available_economy_seats = available_economy_seats + 1
    WHERE flight_no = 7437;
ROLLBACK;


--The following sql statements are part of the transaction for checkIn(client, 244, 2)
INSERT INTO baggage_info(number_of_bags)
    VALUES(2);
SELECT baggage_id
    FROM baggage_info
    ORDER BY baggage_id DESC 
    LIMIT 1;
SELECT flight_no
    FROM tickets
    WHERE ticket_no = 244;
SELECT seat_class
    FROM tickets
WHERE ticket_no = 244;
SELECT COUNT(*)+1
    FROM boarding_passes
    LEFT JOIN tickets USING(ticket_no)
    WHERE tickets.flight_no = 4929
AND seat_class = 'economy';
SELECT CONCAT('E', 1);
SELECT COUNT(*)+1
    FROM boarding_passes
    WHERE flight_no = 4929;
INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
    VALUES(244, 4929, 'E1',1,'A03','Z02',69681);
COMMIT;


--The following sql statements are part of the transaction for attemptToChangeSeatClass(client,244)
BEGIN;
SELECT seat_class 
    FROM tickets 
    WHERE ticket_no = 244;  
SELECT passport_no, flight_no 
    FROM tickets 
    WHERE ticket_no = 244;  
SELECT available_business_seats 
    FROM flights 
    WHERE flight_no = 4929;  
UPDATE flights
    SET available_business_seats = available_business_seats - 1
    WHERE flight_no = 4929;
UPDATE flights
    SET available_economy_seats = available_economy_seats + 1
    WHERE flight_no = 4929;
UPDATE tickets
    SET seat_class = 'business'
    WHERE ticket_no = 244;
SELECT count(*) 
    FROM boarding_passes 
    WHERE flight_no = 4929 AND 
    seat_no ILIKE 'b%';  
UPDATE boarding_passes
    SET seat_no = 'B1'
    WHERE ticket_no = 244;
COMMIT;


--The following sql statements are part of the transaction for attemptToChangeSeatClass(client,1)
BEGIN;
SELECT seat_class 
    FROM tickets 
    WHERE ticket_no = 1;  
SELECT passport_no, flight_no 
    FROM tickets 
    WHERE ticket_no = 1;  
SELECT available_economy_seats 
    FROM flights 
    WHERE flight_no = 4918;  
SELECT passport_no 
    FROM business_waitlist 
    WHERE position = 1 AND flight_no = 4918;  
SELECT seat_no 
    FROM boarding_passes 
    WHERE ticket_no = 1;  
SELECT ticket_no 
    FROM tickets 
    WHERE flight_no = 4918 AND passport_no = '101504778';  
SELECT seat_no 
    FROM boarding_passes 
    WHERE ticket_no = 19;  
UPDATE tickets
    SET seat_class = 'economy'
        WHERE ticket_no = 1;
UPDATE boarding_passes
    SET seat_no = 'E1'
        WHERE ticket_no = 1;
UPDATE tickets
    SET seat_class = 'business'
        WHERE ticket_no = 19;
UPDATE boarding_passes
    SET seat_no = 'B2'
        WHERE ticket_no = 19;
UPDATE business_waitlist
    SET position = position - 1
        WHERE flight_no = 4918;
COMMIT;


--The following sql statements are part of the transaction for attemptToChangeSeatClass(client,1)
BEGIN;
SELECT seat_class 
    FROM tickets 
    WHERE ticket_no = 1;  
SELECT passport_no, flight_no 
    FROM tickets 
    WHERE ticket_no = 1;  
SELECT available_business_seats 
    FROM flights 
    WHERE flight_no = 4918;  
SELECT passport_no 
    FROM economy_waitlist 
    WHERE position = 1 AND flight_no = 4918;  
SELECT position
    FROM business_waitlist
        WHERE flight_no = 4918 AND passport_no = '152348925';
SELECT MAX(position)
    FROM business_waitlist
        WHERE flight_no = 4918;
INSERT INTO business_waitlist
    VALUES (10, 4918, '152348925');
COMMIT;


--The following sql statements are part of the transaction for attemptToChangeSeatClass(client,46)
BEGIN;
SELECT seat_class 
    FROM tickets 
    WHERE ticket_no = 46;  
SELECT passport_no, flight_no 
    FROM tickets 
    WHERE ticket_no = 46;  
SELECT available_economy_seats 
    FROM flights 
    WHERE flight_no = 4919;  
SELECT passport_no 
    FROM business_waitlist 
    WHERE position = 1 AND flight_no = 4919;  
SELECT position
    FROM economy_waitlist
        WHERE flight_no = 4919 AND passport_no = '938076846';
ROLLBACK;


--The following sql statements are part of the transaction for attemptToChangeSeatClass(client,46)
BEGIN;
SELECT seat_class 
    FROM tickets 
    WHERE ticket_no = 46;  
SELECT passport_no, flight_no 
    FROM tickets 
    WHERE ticket_no = 46;  
SELECT available_economy_seats 
    FROM flights 
    WHERE flight_no = 4919;  
SELECT passport_no 
    FROM business_waitlist 
    WHERE position = 1 AND flight_no = 4919;  
SELECT position
    FROM economy_waitlist
        WHERE flight_no = 4919 AND passport_no = '938076846';
SELECT MAX(position)
    FROM economy_waitlist
        WHERE flight_no = 4919;
INSERT INTO economy_waitlist
    VALUES (11, 4919, '938076846');
COMMIT;
