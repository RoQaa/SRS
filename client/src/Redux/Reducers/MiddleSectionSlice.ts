import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export interface IMiddleSection {
  _id?: string;
  titleOne: string;
  titleTwo: string;
  backgroundImg: string;
}

interface MiddleSectionState {
  data: IMiddleSection[];
  loading: boolean;
  error: unknown | null;
}

// Initial state
const initialState: MiddleSectionState = {
  data: [],
  loading: false,
  error: null,
};

const SECTION_API = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/middle-section`;

// Async thunk for fetching MiddleSection data
export const fetchMiddleSection = createAsyncThunk(
  "middleSection/fetchMiddleSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(SECTION_API, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(
          error?.response?.data || "Failed to fetch Middle Section data."
        );
    }
  }
);

// Async thunk for fetching MiddleSection data
export const fetchOneMiddleSection = createAsyncThunk(
  "middleSection/fetchOneMiddleSection",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SECTION_API}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(
          error?.response?.data || "Failed to fetch Middle Section data."
        );
    }
  }
);

// Async thunk for Adding MiddleSection data
export const createMiddleSection = createAsyncThunk(
  "middleSection/createMiddleSection",
  async (newData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(SECTION_API, newData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to Add new Middle Section data."
        );
      }
    }
  }
);

// Async thunk for updating MiddleSection data
export const updateMiddleSection = createAsyncThunk(
  "middleSection/updateMiddleSection",
  async (
    { updatedData, id }: { updatedData: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${SECTION_API}/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );
      return response.data.doc;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to update Middle Section data."
        );
      }
    }
  }
);

// Async thunk for deleting MiddleSection data
export const deleteMiddleSection = createAsyncThunk(
  "middleSection/deleteMiddleSection",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${SECTION_API}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to delete Middle Section data."
        );
      }
    }
  }
);

const middleSectionSlice = createSlice({
  name: "middleSection",
  initialState,
  reducers: {
    resetMiddleSectionState: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchMiddleSection actions
    builder.addCase(fetchMiddleSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMiddleSection.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(fetchMiddleSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "An error occurred while fetching data.";
    });

    // Handle fetchOneMiddleSection actions
    builder.addCase(fetchOneMiddleSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOneMiddleSection.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = [action.payload];
      }
      state.loading = false;
    });
    builder.addCase(fetchOneMiddleSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "An error occurred while fetching data.";
    });

    // Handle createMiddleSection actions
    builder.addCase(createMiddleSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createMiddleSection.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = (state.data || []).concat(action.payload.data);
      }
      state.loading = false;
    });
    builder.addCase(createMiddleSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "An error occurred while creating data.";
    });

    // Handle updateMiddleSection actions
    builder.addCase(updateMiddleSection.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateMiddleSection.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = state.data.map((section) => {
          if (section?._id === action.payload?._id) {
            return action.payload;
          }
          return section;
        });
      }
      state.loading = false;
    });
    builder.addCase(updateMiddleSection.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "An error occurred while updating data.";
    });
  },
});

export const { resetMiddleSectionState } = middleSectionSlice.actions;

export default middleSectionSlice.reducer;

