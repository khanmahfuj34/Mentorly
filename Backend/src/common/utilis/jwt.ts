import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const generateToken = (
    payload: object,
    secret: Secret,
    expiresIn: any
) => {
    return jwt.sign(payload, secret, {
        expiresIn,
    });
};

export const verifyToken = (
    token: string,
    secret: Secret
) => {
    return jwt.verify(token, secret);
};