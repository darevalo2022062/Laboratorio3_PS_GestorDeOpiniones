import { Router } from "express";
import { commentDelete, commentPostCreate, commentPutUpdate, commentViewByPost } from "./comment.controller.js";
import { readToken } from "../helpers/token-helper.js";
import { check } from "express-validator";
import { commentExists, opinionExistenceComm } from "../middlewares/comment.middlewares.js";
import { validar } from "../middlewares/validate-fields.js";
import { opinionExistence } from "../middlewares/opinion.middlewares.js";

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
        check('numberComment').not().isEmpty().withMessage('The field is empty ❌'),
        validar,
        commentExists
    ], commentPutUpdate
);

router.delete(
    '/delete',
    [
        readToken,
        check('commentDate').not().isEmpty().withMessage('The field is empty ❌'),
        check('numberComment').not().isEmpty().withMessage('The field is empty ❌'),
        validar,
        commentExists
    ], commentDelete
);

router.get(
    '/get',
    [
        readToken,
        check('postTittle').not().isEmpty().withMessage('The field is empty ❌'),
        check('postDate').not().isEmpty().withMessage('The field is empty ❌'),
        validar,
        opinionExistenceComm
    ], commentViewByPost
);


export default router;