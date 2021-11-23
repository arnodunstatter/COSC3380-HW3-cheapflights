function makeGatePairs() {
  var gates = ["A01", "A02", "A03", "A04", "A05", "B01", "B02", "B03", "B04", "B05"];

  var gates1 = gates.slice(),
    gates2 = gates.slice();

  gates1.sort(function () {
    return 0.5 - Math.random();
  });
  gates2.sort(function () {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < gates.length; i++) {
    if (gates1[i] == gates2[i]) continue;
    else console.log(gates1[i], gates2[i]);
  }

}

function makeAirportPairs() {
  var airport_code = ["BKK", "ICN", "LHR", "JFK", "LAX", "MNL", "IAH", "HND", "GMP", "SEA", "SFO", "MEL", "TPE", "TOJ", "PEK"]

  var air1 = airport_code.slice(),
    air2 = airport_code.slice();

  air1.sort(function () {
    return 0.5 - Math.random();
  });
  air2.sort(function () {
    return 0.5 - Math.random();
  });
  for (var i = 0; i < airport_code.length; i++) {
    if (air1[i] == air2[i]) continue;
    else console.log(air1[i], air2[i]);
  }

}

makeAirportPairs();
console.log("--------------------------------")
makeGatePairs();