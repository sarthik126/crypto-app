import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CoinType } from "../type/CoinType";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { coinDateFormater } from "../util/util";

function CryptoTable() {
  const selectedCoinData: CoinType[] = useAppSelector(
    (state: RootState) => state.coin.selectedCoinData
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="coin table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Rate</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCoinData.map((row) => (
              <TableRow
                key={row.coinRateTime}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">$ {row.coinRate.toFixed(4)}</TableCell>
                <TableCell align="left">
                  {coinDateFormater(row.coinRateTime).split("\n")?.[0]}
                </TableCell>
                <TableCell align="left">
                  {coinDateFormater(row.coinRateTime).split("\n")?.[1]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CryptoTable;
