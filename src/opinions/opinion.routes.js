import { Router } from "express";
import { opinionDelete, opinionPostCreate, opinionPutUpdate } from "./opinion.controller.js";
import { check } from "express-validator";
import { validar } from "../middlewares/validate-fields.js";
import { categoryExistence, opinionExistence } from "../middlewares/opinion.middlewares.js";
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

router.put(
    '/update',
    [
        readToken,
        check('tittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('date').not().isEmpty().withMessage('The field is empty ❌'),
        check('category').custom(categoryExistence),
        opinionExistence,
        validar
    ], opinionPutUpdate
);

router.delete(
    '/delete',
    [
        readToken,
        check('tittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('date').not().isEmpty().withMessage('The field is empty ❌'),
        opinionExistence,
        validar
    ], opinionDelete
);


export default router;