import { Router } from "express";
import { opinionPostCreate } from "./opinion.controller.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-fields.js";
import { categoryExistence } from "../middlewares/opinion.middlewares.js";
import { readToken } from "../helpers/token-helper.js";

const router = Router();

router.post(
    '/new',
    [
        readToken,
        check('tittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('category').not().isEmpty().withMessage('The field is empty ❌'),
        check('category').custom(categoryExistence),
        check('mainText').not().isEmpty().withMessage('The field is empty ❌'),
        validar
    ], opinionPostCreate
);


export default router;