function checkBankAccountExistanceAndOwnership(bankAccount, user, res) {
    if (!bankAccount) return res.status(404).json({message: "Bank Account not found"});
    // #swagger.responses[404] = { description: 'User or Bank Account not Found' }

    if (!user.bankAccounts?.map(bankAccount => bankAccount._id.valueOf()).includes(bankAccount._id.valueOf()))
        return res.status(403).json({message: "User can't modify this Bank Account!"});
    // #swagger.responses[403] = { description: 'User doesn't own the Bank Account' }
}

module.exports = checkBankAccountExistanceAndOwnership;