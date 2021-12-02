const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

require('./routes/getEmail.js')(app);
require('./routes/cancelTicket.js')(app);
require('./routes/checkIn.js')(app);
require('./routes/getWaitlist')(app);
require('./routes/searchDisplay')(app);
require('./routes/getCityList')(app);


app.listen(5000, () => {
    console.log("Server has started on port 5000");
});