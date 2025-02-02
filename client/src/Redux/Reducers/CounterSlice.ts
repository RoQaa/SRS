import { ICounterData } from "@/interfaces/CounterData.interface";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface CounterState {
  counters: ICounterData[];
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  counters: [],
  loading: false,
  error: null,
};

const COUNTER_API = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/counter`;

// Async thunk to fetch counter data
export const fetchCounterData = createAsyncThunk(
  "counter/fetchCounterData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(COUNTER_API, {
        headers: {
          "Authorization": "Bearer " + Cookies.get("auth_token"),
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle 404 response as "no data found"
        if (error.response?.status === 404) {
          return []; // Return an empty array to indicate no data exists
        }
        return rejectWithValue(
          error?.response?.data || "Failed to fetch counter data"
        );
      }
    }
  }
);

// Async thunk to add or update counter data
export const addCounterData = createAsyncThunk(
  "counter/addCounterData",
  async (counterData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(COUNTER_API, counterData, {
        headers: {
          "Authorization": "Bearer " + Cookies.get("auth_token"),
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to add counter data"
        );
      }
    }
  }
);

export const updateCounterData = createAsyncThunk(
  "counter/updateCounterData",
  async (
    { formData, id }: { formData: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${COUNTER_API}/${id}`, formData, {
        headers: {
          "Authorization": "Bearer " + Cookies.get("auth_token"),
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to update counter data"
        );
      }
    }
  }
);

// Create the slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCounterData.fulfilled,
        (state, action: PayloadAction<ICounterData[]>) => {
          state.loading = false;
          state.counters = action.payload;
        }
      )
      .addCase(fetchCounterData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch counter data";
      })
      .addCase(addCounterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCounterData.fulfilled,
        (state, action: PayloadAction<ICounterData>) => {
          state.loading = false;
          state.counters.push(action.payload);
        }
      )
      .addCase(addCounterData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to add counter data";
      })
      .addCase(updateCounterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCounterData.fulfilled,
        (state, action: PayloadAction<ICounterData>) => {
          state.loading = false;
          const updatedCounter = action.payload;
          state.counters = state.counters.map((counter) =>
            counter._id === updatedCounter._id ? updatedCounter : counter
          );
        }
      )
      .addCase(updateCounterData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update counter data";
      });
  },
});

export default counterSlice.reducer;
