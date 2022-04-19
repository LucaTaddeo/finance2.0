const express = require("express");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {body} = require("express-validator");
const User = require("../model/User");
const BankAccount = require("../model/BankAccount");
const isObjectId = require("../middlewares/isObjectId");
const checkBankAccountExistanceAndOwnership = require("../helpers/checkBankAccountExistanceAndOwnership");

const router = express.Router();

router.post(
    "/",
    authenticate,
    validate([
        body("title", "Provide a valid Transaction Title").notEmpty().isString(),
        body("amount", "Provide a valid amount").notEmpty().isNumeric(),
        body("isForeseen", "Provide a boolean value for \"isForeseen\"").optional().isBoolean(),
        body("description", "Provide a valid Description").optional().notEmpty().isString(),
        body("date", "Provide a valid Date").optional().notEmpty().isDate(),
        body("bankAccountId", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId),
    ]),
    async (req, res) => {
        // #swagger.description = 'Create a new Transaction'
        // #swagger.tags = ['Transactions']
        const {title, amount, isForeseen, description, date, bankAccountId} = req.body;

        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({message: "User not found"});

        const bankAccount = await BankAccount.findById(bankAccountId);

        const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
        if (bankAccountErrors) return bankAccountErrors;

        const transaction = {
            title: title,
            amount: amount
        };

        isForeseen && (transaction.isForeseen = isForeseen);
        description && (transaction.description = description);
        date ? (transaction.date = date) : (transaction.date = new Date());

        bankAccount.transactions.push(transaction);

        bankAccount.foreseenBalance += transaction.amount;
        if (!transaction.isForeseen) bankAccount.balance += transaction.amount;

        bankAccount.save()
            .then(result => {
                return res.status(200).json({
                    bankAccount: result
                })
            }) // #swagger.responses[200] = { description: 'New Transaction created successfully' }
            .catch(err => {
                return res
                    .status(500)
                    .json({
                        message: "Can't create transaction!",
                        error: {name: err.name, message: err.message, code: err.code}
                    }); // #swagger.responses[500] = { description: 'Could not create new Transaction' }
            })
    }
);

module.exports = router;