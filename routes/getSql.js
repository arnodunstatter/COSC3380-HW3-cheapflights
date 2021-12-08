const fs = require('fs');

module.exports = app => {
    app.post('/get-sql', async(req, res) => {    
        res.json(await fs.readFileSync('query.sql', {encoding:'utf8', flag:'r'}));
    });
};