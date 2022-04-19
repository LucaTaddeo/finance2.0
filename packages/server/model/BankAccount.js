const {default: mongoose} = require("mongoose");
const BankAccountTypes = require("../helpers/BankAccountTypes");
const Transaction = require("./Transaction");

const BankAccountSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        balance: {
            type: Number,
            required: true,
            default: 0
        },
        foreseenBalance: {
            type: Number,
            required: true,
            default: 0
        },
        transactions: [Transaction], //TODO: embedding transactions will result in too big arrays! better to reference ids!
        accountType: {
            type: String,
            enum: BankAccountTypes,
            required: true,
            default: BankAccountTypes.ACCOUNT
        }
    },
    {collection: "bankAccounts"}
);

module.exports = mongoose.model("bankAccount", BankAccountSchema);
