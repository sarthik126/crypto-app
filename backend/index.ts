import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {Coin} from "./schema/CoinSchema";
import { Worker } from "worker_threads";
import { currencies } from "./data/currencies";

const app: Express = express();

dotenv.config();
const PORT: any = process.env.PORT || 3000;
const MONGO_URL: string = process.env.MONGO_URL || "";
const DATA_LIMIT: any = process.env.DATA_LIMIT || 20;
const CLIENT_HOST: any = process.env.CLIENT_HOST;

let corsOptions = {
  origin : [CLIENT_HOST],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

async function main() {
  const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }
  return await mongoose.connect(MONGO_URL, options);
}

main().then(()=>{console.log("Mongo DB Connected")}).catch(err => console.log("Mongo DB Error", err));

app.get('/', (req: Request, res: Response) => {
  res.send("Server Running...");
});

app.get("/coins-data", async (req: Request, res: Response) => {
  const data = await Coin.find().sort({coinInsertTime: -1}).limit(DATA_LIMIT);
  res.json({total: data.length, items: data});
})

app.get("/coins-data/:coinId", async (req: Request, res: Response) => {
  const {coinId} = req.params;
  const data = await Coin.find({coinId: coinId}).sort({coinInsertTime: -1}).limit(DATA_LIMIT);
  res.json({total: data.length, items: data, coinId: coinId});
})

app.get("/coins-available", async (req: Request, res: Response) => {
  res.json({total: currencies.length, items: currencies});
})

app.get("/coins-load", (req: Request, res: Response) => {
  const worker = new Worker("./dist/worker/worker.js")
  res.send("Data Loading")
})

app.listen(PORT, () => {
  console.log(`Listening on port - ${PORT}`);
});