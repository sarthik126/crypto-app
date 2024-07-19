import { Schema, model } from "mongoose";

export interface ICoin {
  coinId: string;
  coinCurrency: string;
  coinRate: number;
  coinRateTime: string;
  coinInsertTime: any
}

const coinSchema = new Schema<ICoin>({
  coinId: { type: String, required: true },
  coinCurrency: { type: String, required: true },
  coinRate: { type: Number, required: true },
  coinRateTime: { type: String, required: true },
}, { timestamps: { createdAt: 'coinInsertTime' }});

export const Coin = model<ICoin>("Coin", coinSchema);
