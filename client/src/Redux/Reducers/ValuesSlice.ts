import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface Value {
  _id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  link: string;
  images: {
    main: string;
    rotate: string;
  };
  published: boolean;
}

interface ValuesState {
  values: Value[];
  selectedValue: Value | null;
  isLoading: boolean;
  error: string | null;
  activeTab: string;
}

// Initial state
const initialState: ValuesState = {
  values: [],
  selectedValue: null,
  isLoading: false,
  error: null,
  activeTab: "1",
};

const API = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/values`;

// Fetch values from the API
export const fetchValues = createAsyncThunk(
  "values/fetchValues",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API, {
        headers: {
          Authorization: "Bearer " + Cookies.get("auth_token"),
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return (
          rejectWithValue(error?.response?.data) || "Failed to fetch values"
        );
      }
    }
  }
);

// Fetch a single value by id from the API
export const fetchValueById = createAsyncThunk(
  "values/fetchValueById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch value"
        );
      }
    }
  }
);

// Add new value to the database
export const addValue = createAsyncThunk(
  "values/addValue",
  async (value: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API, value, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data || "Failed to add value");
      }
    }
  }
);

// Update an existing value
export const updateValue = createAsyncThunk(
  "values/updateValue",
  async (
    { updatedValue, id }: { updatedValue: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API}/${id}`, updatedValue, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to update value"
        );
      }
    }
  }
);

// Delete a value by id
export const deleteValue = createAsyncThunk(
  "values/deleteValue",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      dispatch(removeValue(id));
      return id;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to delete value"
        );
      }
    }
  }
);

const valuesSlice = createSlice({
  name: "values",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    selectValueById: (state, action: PayloadAction<string>) => {
      state.selectedValue =
        state.values.find((value) => value._id === action.payload) || null;
    },
    removeValue: (state, action: PayloadAction<string>) => {
      state.values = state.values.filter(
        (value) => value._id !== action.payload
      )
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch values actions
      .addCase(fetchValues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchValues.fulfilled,
        (state, action: PayloadAction<Value[]>) => {
          state.isLoading = false;
          state.values = action.payload;
        }
      )
      .addCase(fetchValues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch values";
      })
      // Fetch value by id actions
      .addCase(fetchValueById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchValueById.fulfilled,
        (state, action: PayloadAction<Value>) => {
          state.isLoading = false;
          state.selectedValue = action.payload; // Set the selected value
        }
      )
      .addCase(fetchValueById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch value";
      })
      // Add new value actions
      .addCase(addValue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addValue.fulfilled, (state, action: PayloadAction<Value>) => {
        state.isLoading = false;
        state.values.push(action.payload);
      })
      .addCase(addValue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add value";
      })
      // Update value actions
      .addCase(updateValue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateValue.fulfilled, (state, action: PayloadAction<Value>) => {
        state.isLoading = false;
        const index = state.values.findIndex(
          (value) => value._id === action.payload._id
        );
        if (index !== -1) {
          state.values[index] = action.payload;
        }
      })
      .addCase(updateValue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update value";
      })
  },
});

export const { selectValueById, setActiveTab, removeValue } = valuesSlice.actions;

export default valuesSlice.reducer;
