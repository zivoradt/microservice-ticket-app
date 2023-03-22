import express from "express";
import { requireAuth } from "../middelwares/require-auth";
import { currentUser } from "../middelwares/current-user";
const router = express.Router();

router.get('/currentuser', currentUser, requireAuth, (req, res)=>{
    
    res.send({currentUser: req.currentUser || null})
   
});

export { router as currentUserRoute};