import { Coin } from "../schema/CoinSchema";
import dotenv from "dotenv";
import axios from "axios";
import { currencies } from "../data/currencies";

dotenv.config();
const COIN_API_BASE = process.env.COIN_API_BASE;
const COIN_API_KEY = process.env.COIN_API_KEY;
const COIN_CURRENCY = process.env.COIN_CURRENCY;

interface ICoinResponse {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
}

export const fetch_data = async (asset_id_base: string) : Promise<ICoinResponse | null> => {
  let headers = {
    Accept: "text/json",
    "X-CoinAPI-Key": COIN_API_KEY,
  };

  try {
    let data = await axios.get(
      `${COIN_API_BASE}/${asset_id_base}/${COIN_CURRENCY}`,
      { headers }
    );
    return await data.data;
  } catch (e) {
    return null;
  }
}

export const loader = () : void  => {
  currencies.forEach(async (currency: string): Promise<void> => {
    let data = await fetch_data(currency);

    if (data !== null) {
      let coin = new Coin({
        coinId: data?.asset_id_base,
        coinCurrency: data?.asset_id_quote,
        coinRate: data?.rate,
        coinRateTime: data?.time,
      });
      await coin.save();
      console.log("Loaded --> ", currency)
    }
  });
}
