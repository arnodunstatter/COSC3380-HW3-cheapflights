//departureDates = December 1st, 2021 through December 7th, 2021
//departure times, for each day, a flight leaves every 1 hours
//arrival times are just departure times + 2hrs

//departure times auto generated
//SELECT * FROM generate_series('2021-12-01 00:00:00'::timestamptz,'2021-12-07 23:59:59', '1 hours') as departure;

main();

async function main() {
  //now we make our client using our creds
  const {
    Client
  } = require("pg");
  const creds = require("./creds.json");
  const client = new Client(creds);

  try {
    try {
      client.connect();
    } catch (e) {
      console.log("Problem connecting client");
      throw e;
    }
    var dateNow = Date.now() / 1000;
    console.log(dateNow);
    var queryStr = `INSERT INTO test\rVALUES (to_timestamp(${dateNow}/1000));\r\r`;
    fs.appendFileSync("query.sql", "//Make dates//\r\r" + queryStr, function (err) {
      console.log(err);
    });
    await client.query(queryStr);

    throw "Ending Correctly";
  } catch (e) {
    console.error(e);
    client.end();
    console.log("Disconneced");
    console.log("Process ending");
    process.exit();
  }
}