// lib/mongoose.js
import mongoose from 'mongoose';
let isConnected= false;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  
export const connectToDB = async()=>{
    mongoose.set('strictQuery')
    if(isConnected){
        console.log("MOngoDB is already connected");
        return;
    }
    try{
        await mongoose.connect(MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 60000, 
            connectTimeoutMS: 60000, 
        })
        isConnected=true;
        console.log("mongo DB is connected")
    }
    catch(error){
        console.error('Initial connection attempt failed, retrying...', error);
        setTimeout(connectToDB, 5000);
    }
}


