const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    // #swagger.security = [{"bearerAuth": []}]

    const token = req.headers["x-access-token"]; // #swagger.parameters["x-access-token"] = { in: 'header', description: 'Token for JWT Authentication'}

    if (!token) return res.status(401).json({message: "Missing Token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {username: decoded.username, id: decoded.id};
        req.token = {token: token, iat: decoded.iat, exp: decoded.exp}
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401).send({message: "Token Expired"});
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).send({message: "Invalid Token"});
        } else {
            res.status(500).send({message: "Authorization Error!"});
        }
    }
    // #swagger.responses[401] = { description: 'JWT Authentication Failed' }
    // #swagger.responses[500] = { description: 'Error during JWT Authentication' }
};

module.exports = authenticate;