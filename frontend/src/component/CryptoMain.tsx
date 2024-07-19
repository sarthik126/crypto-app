import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { CoinType } from "../type/CoinType";
import {
  fetchCoinData,
  fetchCoinsAvailable,
  setSelectedCoin,
} from "../feature/coin/coinSlice";
import TollIcon from "@mui/icons-material/Toll";
import CryptoTable from "./CryptoTable";
import CryptoChart from "./CryptoChart";

const INTERVAL = import.meta.env.VITE_INTERVAL;

function CryptoMain() {
  const coinsAvailable: string[] = useAppSelector(
    (state: RootState) => state.coin.coinsAvailable
  );
  const selectedCoin: string | null = useAppSelector(
    (state: RootState) => state.coin.selectedCoin
  );
  const selectedCoinData: CoinType[] = useAppSelector(
    (state: RootState) => state.coin.selectedCoinData
  );

  const dispatch = useAppDispatch();

  function changeSelection(e: any) {
    let coin = e.target.value;
    dispatch(setSelectedCoin(coin));
    dispatch(fetchCoinData(coin));
  }

  function fetchData() {
    dispatch(fetchCoinData(selectedCoin!));
  }

  useEffect(() => {
    dispatch(fetchCoinsAvailable());
  }, []);

  useEffect(() => {
    if (!selectedCoin) return;

    let interval = setInterval(() => fetchData(), INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [selectedCoin]);

  useEffect(() => {
    if (coinsAvailable.length === 0) return;

    let coin = selectedCoin ? selectedCoin : coinsAvailable[0];
    dispatch(fetchCoinData(coin));
    dispatch(setSelectedCoin(coin));
  }, [coinsAvailable, selectedCoin]);

  return (
    <div>
      <nav>
        <h1>Crypto Stats</h1>
      </nav>

      <section>
        <div className="left">
          <div className="control">
            <div className="coin-name">
              <TollIcon />
              {selectedCoin}
            </div>
            <select onChange={changeSelection} defaultValue={selectedCoin!}>
              {coinsAvailable.map((coin) => (
                <option key={coin} value={coin}>
                  {coin}
                </option>
              ))}
            </select>
          </div>
          <div className="chart">
            <CryptoChart />
          </div>
        </div>
        <div className="right">
          <h2>Available Series - {selectedCoinData?.length}</h2>

          <div className="coin-table">
            <CryptoTable />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CryptoMain;
