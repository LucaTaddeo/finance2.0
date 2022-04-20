const express = require("express");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {body, check} = require("express-validator");
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

        const {user} = req.auth;

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

        const {user} = req.auth;

        let sum = 0;
        splitTransactionDetails.map(splitTransactionDetail => {
            sum += parseFloat(splitTransactionDetail.amount);
        });
        if (sum !== amount)
            return res.status(400).json({message: "The sum of all split transactions is different from the total amount!"})

        const accountsDetails = [];

        for (const splitTransactionDetail of splitTransactionDetails) {
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

router.post(
    "/transfer",
    authenticate,
    validate([
        body("title", "Provide a valid Transaction Title").notEmpty().isString(),
        body("amount", "Provide a valid amount").notEmpty().isNumeric(),
        body("isForeseen", "Provide a boolean value for \"isForeseen\"").optional().isBoolean(),
        body("description", "Provide a valid Description").optional().notEmpty().isString(),
        body("date", "Provide a valid Date").optional().notEmpty().isDate(),
        body("fromBankAccountId", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId),
        body("toBankAccountId", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId)
    ]),
    async (req, res) => {
        // #swagger.description = 'Create a new Transfer'
        // #swagger.tags = ['Transactions']
        const {title, amount, isForeseen, description, date, fromBankAccountId, toBankAccountId} = req.body;

        const {user} = req.auth;

        const fromBankAccount = await BankAccount.findById(fromBankAccountId);
        const fromBankAccountErrors = checkBankAccountExistanceAndOwnership(fromBankAccount, user, res);
        if (fromBankAccountErrors) return fromBankAccountErrors;

        const toBankAccount = await BankAccount.findById(toBankAccountId);
        const toBankAccountErrors = checkBankAccountExistanceAndOwnership(toBankAccount, user, res);
        if (toBankAccountErrors) return toBankAccountErrors;

        const transaction = new Transaction({
            title: title,
            amount: amount,
            accountsDetails: [
                {
                    account: fromBankAccount._id,
                    amount: Math.abs(parseFloat(amount)) * -1
                },
                {
                    account: toBankAccount._id,
                    amount: amount
                }
            ],
            isTransfer: true
        });

        isForeseen && (transaction.isForeseen = isForeseen);
        description && (transaction.description = description);
        date ? (transaction.date = date) : (transaction.date = new Date());

        transaction.save()
            .then(async transactionResult => {
                fromBankAccount.transactions.push(transactionResult._id);
                fromBankAccount.foreseenBalance -= parseFloat(amount);
                if (!transactionResult.isForeseen) fromBankAccount.balance -= parseFloat(amount);
                const fromBankAccountRes = await fromBankAccount.save();

                toBankAccount.transactions.push(transactionResult._id);
                toBankAccount.foreseenBalance += parseFloat(amount);
                if (!transactionResult.isForeseen) toBankAccount.balance += parseFloat(amount);
                const toBankAccountRes = await toBankAccount.save();
                return res.status(201).json({
                    fromBankAccount: fromBankAccountRes,
                    toBankAccount: toBankAccountRes,
                    transaction: transactionResult
                }); // #swagger.responses[201] = { description: 'New Transaction created successfully' }
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

router.get(
    "/:id",
    authenticate,
    validate(check("id", "Provide a valid Transaction ID").notEmpty().custom(isObjectId)),
    async (req, res) => {
        // #swagger.description = 'Get a Transaction from its ID'
        // #swagger.tags = ['Transactions']
        const {id} = req.params;

        const {user} = req.auth;

        const transaction = await Transaction.findById(id).populate({path: "accountsDetails.account"});

        for (const accountDetail of transaction.accountsDetails) {
            const bankAccount = await BankAccount.findById(accountDetail.account._id);
            const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
            if (bankAccountErrors) return res.status(403).json({message: "User can't retrieve this Transaction!"});
            // #swagger.responses[403] = { description: 'User does not own the Transaction'}
        }
        return res.send({transaction: transaction}); // #swagger.responses[200] = { description: 'Return the Transaction', schema: { $ref: '#/definitions/Transaction' } }
    }
);

module.exports = router;