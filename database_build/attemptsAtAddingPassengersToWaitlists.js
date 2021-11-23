            for(let passport_no = 987654321; passport_no < 987654321+20; ++passport_no)
            {
                for(let flight_no = 654321; flight_no < 654324; ++flight_no)
                    {
                        var addPerson = 
`INSERT INTO economy_waitlist (position, flight_no, passport_no)
VALUES (
    CASE
        WHEN (SELECT MAX(position)+1
                FROM economy_waitlist
                GROUP BY flight_no='${flight_no}'
                HAVING flight_no='${flight_no}') IS NULL THEN 1,
        ELSE (SELECT MAX(position)+1
                FROM economy_waitlist
                GROUP BY flight_no='${flight_no}'
                HAVING flight_no='${flight_no}'),
        END
    '${flight_no}',
    '${passport_no}'
                    );`;
                await client.query(addPerson);
                    }
            }

            var queryStr =
`do $$
declare
  selectedRow economy_waitlist%rowtype;
begin  

 SELECT * INTO selectedRow
    FROM economy_waitlist
    WHERE flight_no='654321' AND position = 1;
  
    if not found then
        INSERT INTO economy_waitlist (position, flight_no, passport_no)
            VALUES
            (
                1, '654321','987654321'
            );
    else
        INSERT INTO economy_waitlist (position, flight_no, passport_no)
            VALUES
            (
                (SELECT MAX(position)+1
                    FROM economy_waitlist
                    GROUP BY flight_no='654321'
                    HAVING flight_no='654321'),
                '654321',
                '987654321'
            )
  end if;
end $$;`;