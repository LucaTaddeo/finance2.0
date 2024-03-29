const express = require("express");
const authenticate = require("../middlewares/auth");
const BankAccount = require("../model/BankAccount");
const validate = require("../middlewares/validate");
const {body} = require("express-validator");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
    // #swagger.description = 'Get details of logged user'
    // #swagger.tags = ['Users']
    // #swagger.responses[404] = { description: 'User not Found' }
    return res.json(req.auth.user); // #swagger.responses[200] = { description: 'Returns the User', schema: { $ref: '#/definitions/User' } }
});

router.patch(
    "/",
    authenticate,
    validate([
        body("firstName", "Provide a valid new First Name").optional().notEmpty().isString(),
        body("lastName", "Provide a valid new Last Name").optional().notEmpty().isString(),
        body("password", "Provide a valid new Password").optional().notEmpty().isString().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "i"),
    ]),
    async (req, res) => {
        // #swagger.description = 'Modify the Details of a User Account'
        // #swagger.tags = ['Users']
        const {firstName, lastName, password} = req.body;

        const {user} = req.auth;

        firstName && (user.firstName = firstName);
        lastName && (user.lastName = lastName);
        password && (user.password = bcrypt.hashSync(password, 12));

        if (firstName || lastName || password) {
            user.save()
                .then(userRes => {
                    return res
                        .status(200)
                        .json({
                            message: "User modified successfully",
                            user: userRes,
                        }); // #swagger.responses[200] = { description: 'Returns the modified User', schema: { $ref: '#/definitions/User' } }
                })
                .catch(err => {
                    return res
                        .status(500)
                        .json({
                            message: "Can't modify User!",
                            error: {name: err.name, message: err.message, code: err.code}
                        }); // #swagger.responses[500] = { description: 'Could not modify User' }
                })
        } else {
            return res.sendStatus(304); // #swagger.responses[304] = { description: 'Nothing Changed' }
        }
    }
);

router.get("/balance", authenticate, async (req, res) => {
    // #swagger.description = 'Compute balance of logged user'
    // #swagger.tags = ['Users']
    const {user} = req.auth;

    let balance = 0;
    for (const account of user.bankAccounts) {
        const bankAccount = await BankAccount.findById(account);
        if (!bankAccount) return res.status(404).json({message: "Bank Account Not Found"})
        else balance += bankAccount.balance;
        // #swagger.responses[404] = { description: 'User or Bank Account not Found' }
    }
    return res.json({balance: balance}); // #swagger.responses[200] = { description: 'Returns the Balance of the User', type: 'Number'}
})

router.get("/foreseenBalance", authenticate, async (req, res) => {
    // #swagger.description = 'Compute foreseen balance of logged user'
    // #swagger.tags = ['Users']
    const {user} = req.auth;

    let foreseenBalance = 0;
    for (const account of user.bankAccounts) {
        const bankAccount = await BankAccount.findById(account);
        if (!bankAccount) return res.status(404).json({message: "Bank Account Not Found"})
        else foreseenBalance += bankAccount.foreseenBalance;
        // #swagger.responses[404] = { description: 'User or Bank Account not Found' }
    }
    return res.json({foreseenBalance: foreseenBalance}); // #swagger.responses[200] = { description: 'Returns the Foreseen Balance of the User', type: 'Number'}
});

router.get("/bankAccounts", authenticate, async (req, res) => {
    // #swagger.description = 'Get the Bank Accounts of the current User'
    // #swagger.tags = ['Users']
    const {user} = await req.auth.user.populate({
        path: "bankAccounts",
        select: "-transactions"
    }); // #swagger.responses[404] = { description: 'User not Found' }

    return res.json({bankAccounts: user?.bankAccounts});
    // #swagger.responses[500] = { description: 'Returns an array of Bank Accounts', schema: { $ref: '#/definitions/BankAccount' } }
});



module.exports = router;