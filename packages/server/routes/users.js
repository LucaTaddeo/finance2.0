const express = require("express");
const authenticate = require("../middlewares/auth");
const User = require("../model/User");
const BankAccount = require("../model/BankAccount");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
    // #swagger.description = 'Get details of logged user'
    // #swagger.tags = ['Users']
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.sendStatus(404); // #swagger.responses[404] = { description: 'User not Found' }
    return res.json(user); // #swagger.responses[200] = { description: 'Returns the User', schema: { $ref: '#/definitions/User' } }
})

router.get("/balance", authenticate, async (req, res) => {
    // #swagger.description = 'Compute balance of logged user'
    // #swagger.tags = ['Users']
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({message: "User Not Found"});
    let balance = 0;
    for(const account of user.bankAccounts){
        const account = await BankAccount.findById(account);
        if (!account) return res.status(404).json({message: "Bank Account Not Found"})
        else balance += account.balance;
        // #swagger.responses[404] = { description: 'User or Bank Account not Found' }
    }
    return res.json({balance: balance}); // #swagger.responses[200] = { description: 'Returns the Balance of the User', type: 'Number'}
})

router.get("/foreseenBalance", authenticate, async (req, res) => {
    // #swagger.description = 'Compute foreseen balance of logged user'
    // #swagger.tags = ['Users']
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({message: "User Not Found"});
    let foreseenBalance = 0;
    for(const account of user.bankAccounts){
        const account = await BankAccount.findById(account);
        if (!account) return res.status(404).json({message: "Bank Account Not Found"})
        else foreseenBalance += account.foreseenBalance;
        // #swagger.responses[404] = { description: 'User or Bank Account not Found' }
    }
    return res.json({foreseenBalance: foreseenBalance}); // #swagger.responses[200] = { description: 'Returns the Foreseen Balance of the User', type: 'Number'}
})

module.exports = router;