import express from "express";
import { NotFoundError } from "../errors/not-found-error";
const router = express.Router();

router.all('*', async ()=>{
    throw new NotFoundError();
});

export { router as notFoundRouter};