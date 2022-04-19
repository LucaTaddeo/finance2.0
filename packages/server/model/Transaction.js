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
        isTransfer: Boolean,
        isSplit: Boolean,
        accountsDetails: [
            {
                _id: false,
                account: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "bankAccount",
                    required: true,
                    index: true,
                    unique: false
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
