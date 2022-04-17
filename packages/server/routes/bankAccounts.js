const express = require("express");
const {body} = require("express-validator");
const authenticate = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const BankAccountTypes = require("../helpers/BankAccountTypes");
const BankAccount = require("../model/BankAccount");
const User = require("../model/User");

const router = express.Router();

router.post(
    "/",
    authenticate,
    validate(
        body("name", "Provide a valid Name for the Bank Account").notEmpty(),
        body("description", "Provide a valid Description").optional().isString(),
        body("balance", "Provide a valid initial Balance").optional().isNumeric(),
        body("accountType", "Provide a valid account Type").optional().isIn([BankAccountTypes.ACCOUNT])
    ),
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
                            .status(200)
                            .json({
                                message: "Account created successfully",
                                bankAccount: bankAccountRes,
                                user: userRes
                            }); // #swagger.responses[200] = { description: 'Account Created Successfully' }
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

module.exports = router;