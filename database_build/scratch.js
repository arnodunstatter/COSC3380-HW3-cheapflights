
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function arrivalAirportCode(departure_airport_code)
{
    var airport_codes = ["BKK", "LHR", "JFK", "LAX", "MNL", "IAH", "HND", "GMP", "SEA", "SFO", "MEL", "TPE", "TOJ", "PEK", "MEX"];
    var arrival_airport_code = airport_codes[getRandomInt(0,airport_codes.length-1)];
    while(arrival_airport_code == departure_airport_code)
        arrival_airport_code = airport_codes[getRandomInt(0,airport_codes.length-1)];
    return arrival_airport_code;
}

for (let i = 0; i < 200; ++i)
    if ("BKK" == arrivalAirportCode("BKK"))
        console.log("You fucked up");