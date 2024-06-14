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
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000, 
            connectTimeoutMS: 5000, 
        })
        isConnected=true;
        console.log("mongo DB is connected")
    }
    catch(error){
        console.error('Initial connection attempt failed, retrying...', error);
        setTimeout(connectToDB, 5000);
    }
    setTimeout(async () => {
        try {
          await mongoose.connect(MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
            connectTimeoutMS: 5000,
          });
  
          isConnected = true;
          console.log("MongoDB is connected after retry");
        } catch (retryError) {
          console.error('Retry connection attempt failed:', retryError);
        }
      }, 5000);
}


