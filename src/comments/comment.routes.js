import { Router } from "express";
import { commentPostCreate, commentPutUpdate } from "./comment.controller.js";
import { readToken } from "../helpers/token-helper.js";
import { check } from "express-validator";
import { commentExists, opinionExistenceComm } from "../middlewares/comment.middlewares.js";
import { validar } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    '/new',
    [
        readToken,
        check('postTittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('postDate').not().isEmpty().withMessage('The field is empty ❌'),
        check('commentText').not().isEmpty().withMessage('The field is empty ❌'),
        validar,
        opinionExistenceComm
    ], commentPostCreate
);

router.put(
    '/update',
    [
        readToken,
        check('commentDate').not().isEmpty().withMessage('The field is empty ❌'),
        check('commentText').not().isEmpty().withMessage('The field is empty ❌'),
        validar,
        commentExists
    ], commentPutUpdate
);

export default router;