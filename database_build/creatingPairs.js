function makePairs() {
  var gates = ["A01", "A02", "A03", "A04", "A05", "B01", "B02", "B03", "B04", "B05"];
  var airport_code = ["BKK", "ICN", "LHR", "JFK", "LAX", "MNL", "IAH", "HND", "GMP", "SEA", "SFO", "MEL", "TPE", "TOJ", "PEK"]

  var gates1 = gates.slice(),
    gates2 = gates.slice();

  gates1.sort(function () {
    return 0.5 - Math.random();
  });
  gates2.sort(function () {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < gates.length; i++)
    console.log(gates1[i], gates2[i]);

  var air1 = airport_code.slice(),
    air2 = airport_code.slice();

  air1.sort(function () {
    return 0.5 - Math.random();
  });
  air2.sort(function () {
    return 0.5 - Math.random();
  });
  for (var i = 0; i < airport_code.length; i++)
    console.log(air1[i], air2[i]);
}

makePairs();
makePairs();