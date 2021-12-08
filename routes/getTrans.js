const fs = require('fs');

module.exports = app => {
    app.post('/get-trans', async(req, res) => {    
        res.json(await fs.readFileSync('transaction.sql', {encoding:'utf8', flag:'r'}));
    });
};