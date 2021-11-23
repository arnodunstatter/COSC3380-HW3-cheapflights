function makeGatePairs() {
  var gates = ["A01", "A02", "A03", "A04", "A05", "B01", "B02", "B03", "B04", "B05"];
  var arrivalGatesArray = [];
  var departureGatesArray = [];
  var depGates = gates.slice(),
    arrGates = gates.slice();

  depGates.sort(function () {
    return 0.5 - Math.random();
  });
  arrGates.sort(function () {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < gates.length; i++) {
    if (depGates[i] == arrGates[i]) continue;
    else {
      arrivalGatesArray.push(arrGates[i]);
      departureGatesArray.push(depGates[i]);
      console.log(depGates[i], arrGates[i]);
    }
  }
  console.log("departure gate:", departureGatesArray);
  console.log("arrival gate:", arrivalGatesArray);
}

function makeAirportPairs() {
  var airport_code = ["BKK", "ICN", "LHR", "JFK", "LAX", "MNL", "IAH", "HND", "GMP", "SEA", "SFO", "MEL", "TPE", "TOJ", "PEK"]
  var arrivalAirportArray = [];
  var departureAirportArray = [];
  var depAirport = airport_code.slice(),
    arrAirport = airport_code.slice();

  depAirport.sort(function () {
    return 0.5 - Math.random();
  });
  arrAirport.sort(function () {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < airport_code.length; i++) {
    if (depAirport[i] == arrAirport[i]) continue;
    else {
      arrivalAirportArray.push(arrAirport[i]);
      departureAirportArray.push(depAirport[i]);
      console.log(depAirport[i], arrAirport[i]);
    }
  }
  console.log("departure airport:", departureAirportArray);
  console.log("arrival airport:", arrivalAirportArray);
}


makeAirportPairs();
console.log("--------------------------------")
makeGatePairs();