const swaggerAutogen = require('swagger-autogen')()
const BankAccountTypes = require("./helpers/BankAccountTypes");
const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Finance 2.0",
        description: "Documentation for personal Finance Application"
    },
    host: "localhost:3000",
    basePath: "/api/v1",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Health",
            "description": "Health Check for the API Server"
        },
        {
            "name": "Auth",
            "description": "Authentication Endpoint, containing features like login and signup"
        },
        {
            "name": "Users",
            "description": "Endpoint for Users"
        },
        {
            "name": "BankAccounts",
            "description": "Endpoint for Bank Accounts"
        },
        {
            "name": "Transactions",
            "description": "Endpoint for Transactions"
        },

    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    definitions: {
        User: {
            $username: "mariorossi",
            $password: "password",
            firstName: "Mario",
            lastName: "Rossi",
            bankAccounts: [
                {$ref: "#/definitions/BankAccount"},
            ],
        },
        BankAccount: {
            $name: "N26",
            description: "My personal Bank Account",
            $balance: 1000,
            $foreseenBalance: -500,
            transactions: {$ref: "#/definitions/Transaction"},
            $accountType: BankAccountTypes,

        },
        Transaction: {
            $title: "Netflix Subscription",
            description: "My monthly subscription to Netflix for August",
            $amount: 7.99,
            date: Date.now(),
            isForeseen: false,
            originAccount: {$ref: "#/definitions/BankAccount"},
            destinationAccount: {$ref: "#/definitions/BankAccount"},
            splitTransactionDetails: [
                {
                    account: {$ref: "#/definitions/BankAccount"},
                    amount: 7.99
                },
            ]
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc);