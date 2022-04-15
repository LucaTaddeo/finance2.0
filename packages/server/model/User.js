const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true },
            dropDups: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: String,
        lastName: String,
        bankAccounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "bankAccount",
            },
        ],
    },
    { collection: "users" }
);

module.exports = mongoose.model("user", UserSchema);
