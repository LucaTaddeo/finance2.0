const express = require("express");
const {body, check} = require("express-validator");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const BankAccountTypes = require("../helpers/BankAccountTypes");
const BankAccount = require("../model/BankAccount");
const User = require("../model/User");
const isObjectId = require("../middlewares/isObjectId");
const checkBankAccountExistanceAndOwnership = require("../helpers/checkBankAccountExistanceAndOwnership");

const router = express.Router();

router.post(
    "/",
    authenticate,
    validate([
        body("name", "Provide a valid Name for the Bank Account").notEmpty().isString(),
        body("description", "Provide a valid Description").optional().notEmpty().isString(),
        body("balance", "Provide a valid initial Balance").optional().notEmpty().isNumeric(),
        body("accountType", "Provide a valid account Type").optional().notEmpty().isIn([BankAccountTypes.ACCOUNT])
    ]),
    async (req, res) => {
        // #swagger.description = 'Create a new Bank Account'
        // #swagger.tags = ['BankAccounts']
        const {name, description, balance, accountType} = req.body;

        const user = await req.auth.user.populate({
            path: "bankAccounts",
            select: "name"
        });

        if (user.bankAccounts?.map(bankAccount => bankAccount.name).includes(name))
            return res.status(422).json({message: "User already has a Bank Account with this name!"});
        // #swagger.responses[422] = { description: 'Duplicated Bank Account Name for current User' }

        const bankAccount = new BankAccount({
            name: name
        });

        description && (bankAccount.description = description);
        balance && (bankAccount.balance = balance);
        accountType && (bankAccount.accountType = accountType);

        bankAccount.save()
            .then(bankAccountRes => {
                user.bankAccounts.push(bankAccountRes._id);
                user.save()
                    .then(userRes => {
                        return res
                            .status(201)
                            .json({
                                message: "Account created successfully",
                                bankAccount: bankAccountRes,
                                user: userRes
                            }); // #swagger.responses[201] = { description: 'Account Created Successfully' }
                    })
                    .catch(err => {
                        return res
                            .status(500)
                            .json({
                                message: "Can't update user!",
                                error: {name: err.name, message: err.message, code: err.code}
                            });
                    })
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({
                        message: "Can't create bankAccount!",
                        error: {name: err.name, message: err.message, code: err.code}
                    }); // #swagger.responses[500] = { description: 'Could not create Account or Update User' }
            })

    }
);

router.patch(
    "/",
    authenticate,
    validate([
        body("id", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId),
        body("name", "Provide a valid new Name for the Bank Account").optional().notEmpty().isString(),
        body("description", "Provide a valid new Description").optional().notEmpty().isString(),
        body("accountType", "Provide a valid new account Type").optional().notEmpty().isIn([BankAccountTypes.ACCOUNT])
    ]),
    async (req, res) => {
        // #swagger.description = 'Modify the Details of a Bank Account'
        // #swagger.tags = ['BankAccounts']
        const {id, name, description, accountType} = req.body;

        const user = await req.auth.user.populate({
                path: "bankAccounts",
                select: "name"
            });

        if (name && user.bankAccounts?.map(bankAccount => bankAccount.name).includes(name))
            return res.status(422).json({message: "User already has a Bank Account with this name!"});
        // #swagger.responses[422] = { description: 'Duplicated Bank Account Name for current User' }

        const bankAccount = await BankAccount.findById(id);

        const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
        if (bankAccountErrors) return bankAccountErrors;

        name && (bankAccount.name = name);
        description && (bankAccount.description = description);
        accountType && (bankAccount.accountType = accountType);

        if (name || description || accountType) {
            bankAccount.save()
                .then(bankAccountRes => {
                    return res
                        .status(200)
                        .json({
                            message: "Account modified successfully",
                            bankAccount: bankAccountRes,
                        }); // #swagger.responses[200] = { description: 'Returns the modified Account', schema: { $ref: '#/definitions/BankAccount' } }
                })
                .catch(err => {
                    return res
                        .status(500)
                        .json({
                            message: "Can't modify bankAccount!",
                            error: {name: err.name, message: err.message, code: err.code}
                        }); // #swagger.responses[500] = { description: 'Could not modify Account' }
                })
        } else {
            return res.sendStatus(304); // #swagger.responses[304] = { description: 'Nothing Changed' }
        }
    }
);

router.delete(
    "/",
    authenticate,
    validate(body("id", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId)),
    async (req, res) => {
        // #swagger.description = 'Delete a Bank Account'
        // #swagger.tags = ['BankAccounts']
        const {id} = req.body;

        const {user} = req.auth;

        const bankAccount = await BankAccount.findById(id);

        const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
        if (bankAccountErrors) return bankAccountErrors;

        BankAccount.findByIdAndDelete(bankAccount._id)
            .then(bankAccountResult => {
                User.updateOne({_id: user._id}, {$pull: {bankAccounts: bankAccount._id}})
                    .then(userResult => {
                        return res
                            .status(200)
                            .json({
                                message: "Bank Account removed",
                                bankAccount: bankAccountResult,
                                user: userResult
                            }) // #swagger.responses[200] = { description: 'Return the deleted Bank Account', schema: { $ref: '#/definitions/BankAccount' } }
                    })
                    .catch(err => {
                        return res
                            .status(500)
                            .json({
                                message: "Can't update User!",
                                error: {name: err.name, message: err.message, code: err.code}
                            });
                    });
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({
                        message: "Can't delete bankAccount!",
                        error: {name: err.name, message: err.message, code: err.code}
                    }); // #swagger.responses[500] = { description: 'Could not delete Account or update User' }
            });

    }
);

router.get(
    "/:id",
    authenticate,
    validate(check("id", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId)),
    async (req, res) => {
        // #swagger.description = 'Get a Bank Account from its ID'
        // #swagger.tags = ['BankAccounts']
        const {id} = req.params;

        const {user} = req.auth;

        const bankAccount = await BankAccount.findById(id);

        const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
        if (bankAccountErrors) return bankAccountErrors;
        else return res.send({bankAccount: bankAccount}); // #swagger.responses[200] = { description: 'Return the Bank Account', schema: { $ref: '#/definitions/BankAccount' } }
    }
);

router.get(
    "/:id/transactions",
    authenticate,
    validate(check("id", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId)),
    async (req, res) => {
        // #swagger.description = 'Get a Bank Account from its ID'
        // #swagger.tags = ['BankAccounts']
        const {id} = req.params;

        const {user} = req.auth;

        const bankAccount = await BankAccount.findById(id).populate({
            path: "transactions",
            options: {sort: {'date': -1}}
        });

        const bankAccountErrors = checkBankAccountExistanceAndOwnership(bankAccount, user, res);
        if (bankAccountErrors) return bankAccountErrors;
        else return res.send({transactions: bankAccount.transactions}); // #swagger.responses[200] = { description: 'Return the Bank Account', schema: { $ref: '#/definitions/BankAccount' } }
    }
);

module.exports = router;