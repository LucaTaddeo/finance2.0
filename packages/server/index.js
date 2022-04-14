const express = require("express");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000

app.get('/api', (req, res) => {
    res.json({"message": "Hello World!"});
});

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("../web/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "../web/build/index.html"));
    });
}


app.listen(PORT)