const express = require("express");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {body} = require("express-validator");
const User = require("../model/User");
const BankAccount = require("../model/BankAccount");
const Transaction = require("../model/Transaction");
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
        body("bankAccountId", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId)
    ]),
    async (req, res) => {
        // #swagger.description = 'Create a new Standard Transaction'
        // #swagger.tags = ['Transactions']
        const {title, amount, isForeseen, description, date, bankAccountId} = req.body;

        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({message: "User not found"});

        const bankAccount = await BankAccount.findById(bankAccountId);

        const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
        if (bankAccountErrors) return bankAccountErrors;

        const transaction = new Transaction({
            title: title,
            amount: amount,
            accountsDetails: [{account: bankAccount._id, amount: amount}]
        });

        isForeseen && (transaction.isForeseen = isForeseen);
        description && (transaction.description = description);
        date ? (transaction.date = date) : (transaction.date = new Date());

        transaction.save()
            .then(transactionResult => {
                bankAccount.transactions.push(transactionResult._id);
                bankAccount.foreseenBalance += parseFloat(transactionResult.amount);
                if (!transactionResult.isForeseen) bankAccount.balance += parseFloat(transactionResult.amount);
                bankAccount.save()
                    .then(bankAccountResult => {
                        return res.status(201).json({
                            bankAccount: bankAccountResult,
                            transaction: transactionResult
                        }); // #swagger.responses[201] = { description: 'New Transaction created successfully' }
                    })
                    .catch(err => {
                        return res
                            .status(500)
                            .json({
                                message: "Can't update Bank Account!",
                                error: {name: err.name, message: err.message, code: err.code}
                            });
                    });
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({
                        message: "Can't create Transaction!",
                        error: {name: err.name, message: err.message, code: err.code}
                    }); // #swagger.responses[500] = { description: 'Could not create new Transaction or update Bank Account' }
            });
    }
);

router.post(
    "/split",
    authenticate,
    validate([
        body("title", "Provide a valid Transaction Title").notEmpty().isString(),
        body("amount", "Provide a valid amount").notEmpty().isNumeric(),
        body("isForeseen", "Provide a boolean value for \"isForeseen\"").optional().isBoolean(),
        body("description", "Provide a valid Description").optional().notEmpty().isString(),
        body("date", "Provide a valid Date").optional().notEmpty().isDate(),
        body("splitTransactionDetails", "Provide valid Split Account Details").notEmpty().isArray(),
        body("splitTransactionDetails.*.bankAccountId", "Provide valid Bank Account IDs").notEmpty().custom(isObjectId),
        body("splitTransactionDetails.*.amount", "Provide valid Bank Account IDs").notEmpty().isNumeric()
    ]),
    async (req, res) => {
        // #swagger.description = 'Create a new Split Transaction'
        // #swagger.tags = ['Transactions']
        const {title, amount, isForeseen, description, date, splitTransactionDetails} = req.body;

        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({message: "User not found"});

        let sum = 0;
        splitTransactionDetails.map(splitTransactionDetail => {
            sum += parseFloat(splitTransactionDetail.amount);
        });
        if (sum !== amount)
            return res.status(400).json({message: "The sum of all split transactions is different from the total amount!"})

        const accountsDetails = [];

        for (const splitTransactionDetail of splitTransactionDetails){
            const bankAccount = await BankAccount.findById(splitTransactionDetail.bankAccountId);
            const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
            if (bankAccountErrors) return bankAccountErrors;
            accountsDetails.push({account: bankAccount._id, amount: splitTransactionDetail.amount});
            splitTransactionDetail.bankAccount = bankAccount;
        }

        const transaction = new Transaction({
            title: title,
            amount: amount,
            accountsDetails: accountsDetails,
            isSplit: true
        });

        isForeseen && (transaction.isForeseen = isForeseen);
        description && (transaction.description = description);
        date ? (transaction.date = date) : (transaction.date = new Date());

        transaction.save()
            .then(transactionResult => {
                Promise.all(splitTransactionDetails.map(splitTransactionDetail => {
                    splitTransactionDetail.bankAccount.transactions.push(transactionResult._id);
                    splitTransactionDetail.bankAccount.foreseenBalance += parseFloat(splitTransactionDetail.amount);
                    if (!transactionResult.isForeseen) splitTransactionDetail.bankAccount.balance += parseFloat(splitTransactionDetail.amount);
                    return splitTransactionDetail.bankAccount.save()
                }))
                    .then(bankAccountsResults => {
                        return res.status(201).json({
                            bankAccounts: bankAccountsResults,
                            transaction: transactionResult
                        }); // #swagger.responses[201] = { description: 'New Transaction created successfully' }
                    })
                    .catch(err => {
                        return res
                            .status(500)
                            .json({
                                message: "Can't update Bank Account!",
                                error: {name: err.name, message: err.message, code: err.code}
                            });
                    });
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({
                        message: "Can't create Transaction!",
                        error: {name: err.name, message: err.message, code: err.code}
                    }); // #swagger.responses[500] = { description: 'Could not create new Transaction or update Bank Accounts' }
            });
    }
);

module.exports = router;