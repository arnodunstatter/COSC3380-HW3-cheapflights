--The following sql statements are part of the transaction for checkIn(client,224, 1)BEGIN;INSERT INTO baggage_info(number_of_bags)
            VALUES(1);SELECT baggage_id
            FROM baggage_info
            ORDER BY baggage_id DESC 
            LIMIT 1;SELECT flight_no
            FROM tickets
            WHERE ticket_no = 224;SELECT seat_class
            FROM ticketsWHERE ticket_no = 224;SELECT COUNT(*)+1
            FROM boarding_passes
            LEFT JOIN tickets USING(ticket_no)
            WHERE tickets.flight_no = 4928AND seat_class = 'economy';SELECT CONCAT('E', 3);SELECT COUNT(*)+1
            FROM boarding_passes
            WHERE flight_no = 4928;INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
            VALUES(224, 4928, 'E3',4,'B01','Y01',69723);COMMIT;--The following sql statements are part of the transaction for checkIn(client,224, 1)BEGIN;INSERT INTO baggage_info(number_of_bags)
            VALUES(1);SELECT baggage_id
            FROM baggage_info
            ORDER BY baggage_id DESC 
            LIMIT 1;SELECT flight_no
            FROM tickets
            WHERE ticket_no = 224;SELECT seat_class
            FROM ticketsWHERE ticket_no = 224;SELECT COUNT(*)+1
            FROM boarding_passes
            LEFT JOIN tickets USING(ticket_no)
            WHERE tickets.flight_no = 4928AND seat_class = 'economy';SELECT CONCAT('E', 4);SELECT COUNT(*)+1
            FROM boarding_passes
            WHERE flight_no = 4928;INSERT INTO boarding_passes(ticket_no, flight_no, seat_no, boarding_no, gate_no, baggage_claim, baggage_id)
            VALUES(224, 4928, 'E4',5,'B01','Y01',69724);ROLLBACK;