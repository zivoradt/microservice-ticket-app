import express from "express";
import 'express-async-errors'
import {json} from 'body-parser';
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { authRouter } from "./routes";
import { errorHandler } from "@zivoradt/common";
import { signinRouter } from "./routes/signin";

// Initiate app
const app = express();

// Settings to tell app that traffic go through proxy
app.set('trust proxy', true);

// Using JSON
app.use(json());

// Setting coockie session with secure 'HTTPS' connection
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

// Route handler
app.use(authRouter);

// Error handler
app.use(errorHandler);

export {app};