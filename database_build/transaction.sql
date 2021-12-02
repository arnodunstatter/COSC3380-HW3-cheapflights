--Begin transaction for cancellations for ${book_ref}--BEGIN;UPDATE bookings 
    SET canceled = 't'
    WHERE book_ref = 227;SELECT flight_no
                FROM tickets
                WHERE book_ref = 227;ROLLBACK;