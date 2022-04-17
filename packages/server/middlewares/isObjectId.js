const {default: mongoose} = require("mongoose"),
    ObjectId = mongoose.Types.ObjectId;

const isObjectId = (param) => {
    let oId = new ObjectId(param);
    if (ObjectId.isValid(oId) && param === oId.valueOf()) return true;
    else throw new Error("Invalid ObjectId!");
};

module.exports = isObjectId;