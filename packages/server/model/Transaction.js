const {default: mongoose} = require("mongoose");

const TransactionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        isForeseen: Boolean,
        originAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bankAccount",
        },
        destinationAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bankAccount",
        },
        splitTransactionDetails: [
            {
                account: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "bankAccount",
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                }
            },
        ]
    },
    {collection: "transactions"}
);

module.exports = mongoose.model("transaction", TransactionSchema);
