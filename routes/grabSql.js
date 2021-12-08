var fs = require("fs");

module.exports = app => {
    
    app.post('/routes/grabSql', async (req, res) => {
        main(req.body.fileName);

        async function main(fileName) {
            //now we make our client using our creds
            const {
                Client
            } = require('pg');
            const creds = require('../config/creds.json');
            const client = new Client(creds);

            try {

                queries = findSQL("SELECT", fileName);
                console.log(queries)
                res.json(queries);
                throw ("Ending Correctly");
            } catch (e) {
                console.error(e);
            }

        }
        function findSQL(uniqueIdentifierStr, fileNameToLookIn) 
        {
            /*
            uniqueIdentifierStr will be the function call in the comment above each chunk of SQL - this uniquely identifies the chunk
                    Ex: "checkIn(client, 244, 2)"
            fileNameToLookIn will either be "transaction.sql" or "query.sql"
            */
            const buffer = fs.readFileSync(fileNameToLookIn);
            console.log(fileStr); 
            var fileStr = buffer.toString();
            //console.log(fileStr);
            var fileStrSplitInHalf = fileStr.split(uniqueIdentifierStr+"\r\n");
            //console.log(fileStrSplitInHalf);
            var secondHalf = fileStrSplitInHalf[1];
            //console.log(secondHalf);
            var whatWeCareAbout = secondHalf.split("\r\n\r\n");
            //console.log(whatWeCareAbout);
            whatWeCareAbout = whatWeCareAbout[0];
            console.log(whatWeCareAbout)
            return whatWeCareAbout;
        }
    });
};