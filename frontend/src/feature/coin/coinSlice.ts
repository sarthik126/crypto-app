import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoinType } from "../../type/CoinType";
import axiosInstance from "../../api/global";
import { AppDispatch } from "../../redux/store";

export interface initialStateType {
  coinsAvailable: string[];
  selectedCoin: string | null;
  selectedCoinData: CoinType[];

  isCoinDataLoading: boolean;
  isCoinsAvailableLoading: boolean;

  isCoinDataError: boolean;
  isCoinsAvailableError: boolean;
}

const initialState: initialStateType = {
  coinsAvailable: [],
  selectedCoin: null,
  selectedCoinData: [],

  isCoinDataLoading: false,
  isCoinsAvailableLoading: false,

  isCoinDataError: true,
  isCoinsAvailableError: true,
};

interface IAvailableCoinsResp {
  total: number;
  items: string[];
}

interface ICoinDataResp {
  total: number;
  items: CoinType[];
  coinId: string;
}

const fetchCoinsAvailable = createAsyncThunk<IAvailableCoinsResp, void, {dispatch: AppDispatch}>(
  "coin/fetchCoinsAvailable",
  async () => {
    let data = await axiosInstance.get("/coins-available");
    return (await data.data) as IAvailableCoinsResp;
  }
);

const fetchCoinData = createAsyncThunk<ICoinDataResp, string, {dispatch: AppDispatch}>(
  "coin/fetchCoinData",
  async (coinId: string) => {
    let data = await axiosInstance.get(`/coins-data/${coinId}`);
    return (await data.data) as ICoinDataResp;
  }
);

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoinsAvailable: (state, action: PayloadAction<string[]>) => {
      state.coinsAvailable = action.payload;
    },
    setSelectedCoin: (state, action: PayloadAction<string>) => {
      state.selectedCoin = action.payload;
    },
    setSelectedCoinData: (state, action: PayloadAction<CoinType[]>) => {
      state.selectedCoinData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoinData.pending, (state) => {
      state.isCoinDataLoading = true;
      state.isCoinDataError = false;
    }),
      builder.addCase(fetchCoinData.rejected, (state) => {
        state.isCoinDataLoading = false;
        state.isCoinDataError = true;
      }),
      builder.addCase(fetchCoinData.fulfilled, (state, action) => {
        state.selectedCoinData = action.payload.items;
        state.selectedCoin = action.payload.coinId;
        state.isCoinDataLoading = false;
        state.isCoinDataError = false;
      }),

      builder.addCase(fetchCoinsAvailable.pending, (state) => {
        state.isCoinsAvailableLoading = true;
        state.isCoinsAvailableError = false;
      }),
      builder.addCase(fetchCoinsAvailable.rejected, (state) => {
        state.isCoinsAvailableLoading = false;
        state.isCoinsAvailableError = true;
      }),
      builder.addCase(fetchCoinsAvailable.fulfilled, (state, action) => {
        state.coinsAvailable = action.payload.items;
        state.isCoinsAvailableLoading = false;
        state.isCoinsAvailableError = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setCoinsAvailable, setSelectedCoin, setSelectedCoinData } =
  coinSlice.actions;
export { fetchCoinsAvailable, fetchCoinData };
export default coinSlice.reducer;
