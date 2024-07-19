import { LineChart } from "@mui/x-charts";
import { coinDateFormater } from "../util/util";
import { CoinType } from "../type/CoinType";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

function CryptoChart() {
  const selectedCoinData: CoinType[] = useAppSelector(
    (state: RootState) => state.coin.selectedCoinData
  );

  const dataset = [
    ...selectedCoinData.map((i) => ({
      coinRate: i.coinRate,
      coinRateTime: i.coinRateTime,
    })),
  ];

  return (
    <>
      <LineChart
        grid={{ vertical: true, horizontal: true }}
        dataset={[...dataset]}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "coinRateTime",
            valueFormatter: (coinRateTime) => coinDateFormater(coinRateTime),
          },
        ]}
        series={[
          {
            dataKey: "coinRate",
            label: "Price",
            valueFormatter: (coinRate) => `$ ${coinRate?.toFixed(3)}`,
          },
        ]}
      />
    </>
  );
}

export default CryptoChart;
