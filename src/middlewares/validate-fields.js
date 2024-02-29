import { validationResult } from "express-validator";

export const validar = (req, res, next) => {
    var error = validationResult(req);
    if (!error.isEmpty()) {
        const errorMsgs = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMsgs });
    }

    next();
}