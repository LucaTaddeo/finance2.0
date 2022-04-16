const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require("dotenv").config();

const PORT = process.env.PORT || 3000;

try {
    mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => console.log("MongoDB connected")
    );
} catch (e) {
    console.log(e);
}

const apiRoot = "/api/v1";

const health = require("./routes/health");
const authentication = require("./routes/authentication");
const users = require("./routes/users");
const bankAccounts = require("./routes/bankAccounts");
const transactions = require("./routes/transactions");

app.use(apiRoot + "/health", health)
app.use(apiRoot + "/auth", authentication)
app.use(apiRoot + "/users", users)
app.use(apiRoot + "/bankAccounts", bankAccounts)
app.use(apiRoot + "/transactions", transactions)

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("../web/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "../web/build/index.html"));
    });
}

app.listen(PORT)