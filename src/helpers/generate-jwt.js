import jwt from 'jsonwebtoken';

export const generateToken = (userId = '') => {
    return new Promise((resolve, reject) => {
        const payload = { userId };
        jwt.sign(
            payload,
            process.env.PASSWEBTOKEN,
            {
                expiresIn: "1h"
            },
            (err, token) => {
                err ? (console.log(err), reject('ERROR NO GENERATE')) : resolve(token);
            }
        );
    });
}