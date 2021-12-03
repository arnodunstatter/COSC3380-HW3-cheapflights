module.exports = app => {
    app.post('/search-flight/flights', async (req, res) => {
        function findSQL(uniqueIdentifierStr, fileNameToLookIn) 
        {
            /*
            uniqueIdentifierStr will be the function call in the comment above each chunk of SQL - this uniquely identifies the chunk
                    Ex: "checkIn(client, 244, 2)"
            fileNameToLookIn will either be "transaction.sql" or "query.sql"
            */
            let fs = require('fs'); /////////////////////////////////////////////////You may want to remove this, depending on if there are conflicts with your files already having fs declared/defined
            const buffer = fs.readFileSync(fileNameToLookIn);
            var fileStr = buffer.toString();
            //console.log(fileStr);
            var fileStrSplitInHalf = fileStr.split(uniqueIdentifierStr+"\r\n");
            //console.log(fileStrSplitInHalf);
            var secondHalf = fileStrSplitInHalf[1];
            //console.log(secondHalf);
            var whatWeCareAbout = secondHalf.split("\r\n\r\n");
            //console.log(whatWeCareAbout);
            whatWeCareAbout = whatWeCareAbout[0];
            return whatWeCareAbout;
        }
    });
};