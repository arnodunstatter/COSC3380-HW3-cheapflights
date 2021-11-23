CREATE extension if not exists cube;
CREATE extension if not exists earthdistance;

CREATE TABLE "flight_test" (
  "airport_code" char(3),
  "airport_name" varchar(100),
  "city_name" varchar(40),
  "country" varchar(40),
  "longitude" float8,
  "latitude" float8,
  PRIMARY KEY ("airport_code")
);

INSERT INTO flight_test (airport_code,airport_name,city_name,country,latitude,longitude)
VALUES
  ('BKK','Bangkok International Airport','Bangkok','Thailand',13.912,100.607),
  ('ICN','Licenciado Benito Juarez International Airport','Mexico City','Mexico',19.436,-99.072),
  ('LHR','Heathrow Airport','London','England',51.477,-0.461),
  ('JFK','John F. Kennedy International Airport','New York City','USA',40.640,-73.779),
  ('LAX','Los Angeles International Airport','Los Angeles','USA',33.942,-118.408),
  ('MNL','Ninoy Aquino International Airport','Manila','Philippines',14.509,121.019),
  ('IAH','George Bush Intercontinental Airport','Houston','USA',29.980,-95.340),
  ('HND','Tokyo International Airport','Tokyo','Japan',35.552,139.779),
  ('GMP','Gimpo Airport','Seoul','South Korea',37.558,126.791),
  ('SEA','Seattle–Tacoma International Airport','Seattle','USA',47.449,-122.309),
  ('SFO','San Francisco International Airport','San Francisco','USA',37.619,-122.375),
  ('MEL','Belbourne Essendon Airport','Melbourne','Australia',-37.728,144.902),
  ('TPE','Taoyuan International Airport','Taipei','Taiwan',25.080,121.232),
  ('TOJ','Torrejon Airport','Madrid','Spain',40.371,-3.785),
  ('PEK','Beijing Capital International Airport','Beijing','China',40.080,116.584);

--example: longitude has to be first before latitude, that's just how the function works; distance between JFK and IAH output is in miles; 

  SELECT (
      (SELECT point(longitude,latitude) FROM flight_test WHERE airport_code = 'JFK') <@> 
      (SELECT point(longitude,latitude) FROM flight_test WHERE airport_code = 'IAH')
    ) as distance;

--example2: converting from miles to meters and calculating distance between Tokyo(HND) to the other 14 airports
SELECT a.airport_name AS airport_name,
       a.country      AS country,
       ( Point(a.longitude, a.latitude) <@> Point(b.longitude, b.latitude) ) *
       1609.344
                      AS distance_to_tokyo
FROM   flight_test AS a
       INNER JOIN flight_test AS b
               ON b.airport_code = 'HND'
WHERE  a.airport_code <> b.airport_code
ORDER  BY distance_to_tokyo; 

--the following function to calculate the approximate distance between coordinates; ex. SELECT distance(13.912,100.607,19.436,-99.072) ==> output: 13398.57333
-- CREATE OR REPLACE FUNCTION distance(lat1 FLOAT, lon1 FLOAT, lat2 FLOAT, lon2 FLOAT) RETURNS FLOAT AS $$
-- DECLARE                                                   
--     x float = 69.1 * (lat2 - lat1);                           
--     y float = 69.1 * (lon2 - lon1) * cos(lat1 / 57.3);        
-- BEGIN                                                     
--     RETURN sqrt(x * x + y * y);                               
-- END  
-- $$ LANGUAGE plpgsql;

