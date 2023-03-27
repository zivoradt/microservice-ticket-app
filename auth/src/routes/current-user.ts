import express from "express";
import { requireAuth } from "@zivoradt/common"
import { currentUser } from "@zivoradt/common"  ;
const router = express.Router();

router.get('/currentuser', currentUser, requireAuth, (req, res)=>{
    
    res.send({currentUser: req.currentUser || null})
   
});

export { router as currentUserRoute};