import mongoose from "mongoose";
import dotenv from "dotenv";
import {loader} from "./loader";
import { parentPort } from "worker_threads";

dotenv.config();
const MONGO_URL: string = process.env.MONGO_URL || "";
const FETCH_INTERVAL: any = process.env.FETCH_INTERVAL || 5000;

async function main() {
  const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }
  return await mongoose.connect(MONGO_URL, options);
}

main().then(()=>{
  console.log("Mongo DB Connected")
}).catch(err => {
  console.log("Mongo DB Error", err)
});

let interval = setInterval(() => {
  loader();
  console.log("Data started to loading...");
}, FETCH_INTERVAL);
