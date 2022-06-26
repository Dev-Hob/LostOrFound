import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

// the goal of this middleware is to verify that token exist and is validated and then bind with request to be further processed.
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "you are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_secret, (err, user) => {
        if (err) return next(createError(403, "Token not valid!"));
        req.user = user;
        next()
    })
}

// this middleware is to verify the user data in a cookie.
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id){
            next()
        } else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}
