const express = require("express");
const validate = require("../middlewares/validate");
const {body} = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const router = express.Router();

router.post(
    "/signup",
    validate([
        body("firstName", "Provide a Valid First Name").notEmpty(),
        body("lastName", "Provide a Valid Last Name").notEmpty(),
        body("username", "Provide a Valid Username").notEmpty(),
        body("password", "Provide a Valid Password").notEmpty()
    ]),
    async (req, res) => {
        // #swagger.description = 'Sign Up to create a new user'
        // #swagger.tags = ['Auth']
        const {firstName, lastName, username, password} = req.body;
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: bcrypt.hashSync(password, 12)
        })
        user.save(async function (err, result) {
            if (err) {
                if (err.name === "MongoServerError" && err.code === 11000)
                    return res.status(422).send({ // #swagger.responses[422] = { description: 'Duplicated Username' }
                        message: "Username already exist!",
                        error: {name: err.name, message: err.message, code: err.code}
                    },);
                return res
                    .status(500)
                    .json({
                        message: "Can't create user!",
                        error: {name: err.name, message: err.message, code: err.code}
                    }); // #swagger.responses[500] = { description: 'Error on Insert' }
            } else {
                return res.json(result) // #swagger.responses[200] = { description: 'User created Successfully' }
            }
        });
    }
);

module.exports = router;