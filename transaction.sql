--The following sql statements are part of the transaction for makeBooking(client, 5444,5777,, 1, 0, none, 9876536709, 984367864,Mel,Anon,m@gmail.com,832567889,1990-12-19,economy)BEGIN;SELECT available_economy_seats, available_business_seats
    FROM flights
    WHERE flight_no = 5444;UPDATE flights
    SET available_economy_seats = available_economy_seats - 1
    WHERE flight_no = 5444;SELECT available_economy_seats, available_business_seats
    FROM flights
    WHERE flight_no = 5777;UPDATE flights
    SET available_economy_seats = available_economy_seats - 1
    WHERE flight_no = 5777;SELECT available_economy_seats, available_business_seats
    FROM flights
    WHERE flight_no = null;ROLLBACK;