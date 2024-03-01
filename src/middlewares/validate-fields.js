import { validationResult } from "express-validator";

export const validar = (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        //const errorMsgs = errors.array().map(error => error.msg);
        console
        return res.status(400).json({
            msg:'-----ERROR-----',
            errors
        });
    }
    next();
}