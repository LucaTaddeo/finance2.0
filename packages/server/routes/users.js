const express = require("express");
const authenticate = require("../middlewares/auth");
const User = require("../model/User");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
    // #swagger.description = 'Get details of logged in user'
    // #swagger.tags = ['Users']
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
        return res.sendStatus(404); // #swagger.responses[404] = { description: 'User not Found' }
    return res.json(user); // #swagger.responses[200] = { description: 'Returns the User', schema: { $ref: '#/definitions/User' } }
})

module.exports = router;