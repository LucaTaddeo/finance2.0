const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
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
        (err) => {
            if(err) console.log(err)
            else console.log("MongoDB is connected");
        }
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
app.use(apiRoot + "/user", users)
app.use(apiRoot + "/bankAccounts", bankAccounts)
app.use(apiRoot + "/transactions", transactions)


const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
app.use(apiRoot + '/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    app.use(express.static("../web/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "../web/build/index.html"));
    });
}

app.listen(PORT)