const express = require("express");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../web", "build")));

app.get('/api',(req, res)=>{
    res.json({"message":"Hello World!"});
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../web", "build", "index.html"));
});

app.listen(3000);