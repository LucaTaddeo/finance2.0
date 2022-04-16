const {validationResult} = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        if (typeof validations[Symbol.iterator] === 'function')
            for (let validation of validations)
                await validation.run(req);
        else await validations.run(req)

        const errors = validationResult(req);

        if (errors.isEmpty()) return next();

        // #swagger.responses[400] = { description: 'A Parameter failed Validation' }
        return res.status(400).json({validationErrors: errors.array()});
    };
};

module.exports = validate;