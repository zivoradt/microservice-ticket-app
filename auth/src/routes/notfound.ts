import express from "express";
import { NotFoundError } from "@zivoradt/common";
const router = express.Router();

router.all('*', async ()=>{
    throw new NotFoundError();
});

export { router as notFoundRouter};