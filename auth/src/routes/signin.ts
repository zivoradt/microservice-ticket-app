import express, {Request, Response} from "express";
const router = express.Router();
import {body} from 'express-validator'
import { BadRequestError } from "@zivoradt/common";
import { validateRequest } from "@zivoradt/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken';


router.post('/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], validateRequest, async (req: Request, res:Response)=>{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials');
    } 

    // Generate JWT
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
     }, process.env.JWT_KEY!); 

    // Store it on session object
     req.session = {
        jwt: userJWT
     };

    res.status(200).send(existingUser);
});

export { router as signinRouter};