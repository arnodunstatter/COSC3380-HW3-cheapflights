INSERT INTO economy_waitlist (position, flight_no, passport_no)
VALUES (
    CASE
        WHEN (SELECT MAX(position)+1
                FROM economy_waitlist
                GROUP BY flight_no='654321'
                HAVING flight_no='654321') IS NULL THEN 1,
        ELSE (SELECT MAX(position)+1
                FROM economy_waitlist
                GROUP BY flight_no='654321'
                HAVING flight_no='654321'),
        END
    '654321',
    '987654321'
                    );

