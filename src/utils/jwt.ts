import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"


const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

    return token;
}

const verifiedToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return verifiedToken;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

export const jwtUtils = {
    createToken,
    verifiedToken
}