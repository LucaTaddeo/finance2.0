const express = require("express");
const {body} = require("express-validator");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const BankAccountTypes = require("../helpers/BankAccountTypes");
const BankAccount = require("../model/BankAccount");
const User = require("../model/User");
const isObjectId = require("../middlewares/isObjectId");

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
        // #swagger.tags = ['BankAccount']
        const {name, description, balance, accountType} = req.body;

        const user = await User.findById(req.user.id)
            .select("-password")
            .populate({
                path: "bankAccounts",
                select: "name"
            });

        if (!user) return res.sendStatus(404); // #swagger.responses[404] = { description: 'User not Found' }

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

router.patch("/",
    authenticate,
    validate([
        body("id", "Provide a valid Bank Account ID").notEmpty().custom(isObjectId),
        body("name", "Provide a valid new Name for the Bank Account").optional().notEmpty().isString(),
        body("description", "Provide a valid new Description").optional().notEmpty().isString(),
        body("accountType", "Provide a valid new account Type").optional().notEmpty().isIn([BankAccountTypes.ACCOUNT])
    ]),
    async (req, res) => {
        // #swagger.description = 'Modify the Details of a Bank Account'
        // #swagger.tags = ['BankAccount']
        const {id, name, description, accountType} = req.body;

        const user = await User.findById(req.user.id)
            .select("-password")
            .populate({
                path: "bankAccounts",
                select: "name"
            });

        if (!user) return res.status(404).json({message: "User not found"});

        if (name && user.bankAccounts?.map(bankAccount => bankAccount.name).includes(name))
            return res.status(422).json({message: "User already has a Bank Account with this name!"});
        // #swagger.responses[422] = { description: 'Duplicated Bank Account Name for current User' }

        const bankAccount = await BankAccount.findById(id);

        if (!bankAccount) return res.status(404).json({message: "Bank Account not found"});
        // #swagger.responses[404] = { description: 'User or Bank Account not Found' }

        if (!user.bankAccounts?.map(bankAccount => bankAccount._id.valueOf()).includes(bankAccount._id.valueOf()))
            return res.status(403).json({message: "User can't modify this Bank Account!"});
        // #swagger.responses[403] = { description: 'User doesn't own the Bank Account' }

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
    })

module.exports = router;