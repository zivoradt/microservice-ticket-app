import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload{
    id:string,
    email:string
}

// Change global space inteface of request - adding a currentUser 
declare global {
    namespace Express {
        interface  Request{
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res:Response, next:NextFunction) => {
    // - ? mark inspect is req.session exist at all and then check jwt token
    if(!req.session?.jwt){
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        // Sending payload to next funciton in chain
        req.currentUser = payload;
    } catch (error) {
        
    }
    next();
}
