import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middelwares/validate-request";
import  jwt  from "jsonwebtoken";

import { User } from "../models/user";

const router = express.Router();

router.post('/signup',[
    body('email') 
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max: 20})
        .withMessage("Password myst be between 4 and 20 characters!")
], validateRequest, async (req: Request, res: Response)=>{
     
    const {email , password} = req.body;

    const existingUser = await User.findOne({email});
 
    if(existingUser ){
        throw new BadRequestError('Email in use')
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
     const userJWT = jwt.sign({
        id: user.id,
        email: user.email
     }, process.env.JWT_KEY!); 

    // Store it on session object
     req.session = {
        jwt: userJWT
     };

    res.status(201).send(user);
    
});

export { router as signupRouter};