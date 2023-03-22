import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('Key is not defined!');
    }

    // Connecting to MongoDB
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to MongoDB...')
    } catch(err){
        console.error(err);
    }
    

    // Port
    app.listen('3000', ()=>{
        console.log("Listening on port 3000...");
}); 
};

// At this point starting application
start();