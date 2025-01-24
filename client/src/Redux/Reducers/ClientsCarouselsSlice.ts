import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define ClientCarousel interface
interface ClientCarouselItem {
  _id?: string;
  id?: string;
  title?: string;
  title_ar?: string;
  image: string;
  published: boolean;
  publish?: boolean;
}

interface ClientCarouselState {
  clientsCarousels: ClientCarouselItem[];
  currentClientCarousel: ClientCarouselItem | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ClientCarouselState = {
  clientsCarousels: [],
  currentClientCarousel: null,
  loading: false,
  error: null,
};

// API URI
const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/slide`;

// Async thunk for fetching all client carousel items
export const fetchClientsCarousels = createAsyncThunk(
  "clientsCarousel/fetchClientsCarousels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}?type=ClientCarousel`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          error.message || "Failed to fetch client carousels"
        );
      }
    }
  }
);

// Async thunk for fetching a single client carousel item by ID
export const fetchClientCarouselById = createAsyncThunk(
  "clientsCarousel/fetchClientCarouselById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/${id}`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data ?? "Failed to Fetch Data");
      }
    }
  }
);

// Async thunk for adding a new client carousel item
export const addClientCarousel = createAsyncThunk(
  "clientsCarousel/addClientCarousel",
  async (newItem: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URI, newItem, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data ?? "Failed to add client carousels"
        );
      }
    }
  }
);

// Async thunk for updating an existing client carousel item
export const updateClientCarousel = createAsyncThunk(
  "clientsCarousel/updateClientCarousel",
  async (
    { id, updatedItem }: { id: string; updatedItem: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URI}/${id}`, updatedItem, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to update client carousels"
        );
      }
    }
  }
);

// Async thunk for deleting a client carousel item
export const deleteClientCarousel = createAsyncThunk(
  "clientsCarousel/deleteClientCarousel",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URI}/${id}`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      dispatch(removeClientCarousel(id));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to delete client carousels"
        );
      }
    }
  }
);

// Client Carousel slice
const clientCarouselSlice = createSlice({
  name: "clientsCarousel",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    clearCurrentClientCarousel(state) {
      state.currentClientCarousel = null;
    },
    removeClientCarousel: (state, action: PayloadAction<string>) => {
      state.clientsCarousels = state.clientsCarousels.filter(
        (carousel) => carousel._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClientsCarousels.fulfilled,
        (state, action: PayloadAction<ClientCarouselItem[]>) => {
          state.loading = false;
          state.clientsCarousels = action.payload;
        }
      )
      .addCase(fetchClientsCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchClientCarouselById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClientCarouselById.fulfilled,
        (state, action: PayloadAction<ClientCarouselItem>) => {
          state.loading = false;
          state.currentClientCarousel = action.payload;
        }
      )
      .addCase(fetchClientCarouselById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addClientCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addClientCarousel.fulfilled,
        (state, action: PayloadAction<ClientCarouselItem>) => {
          state.clientsCarousels.push(action.payload);
        }
      )
      .addCase(addClientCarousel.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateClientCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateClientCarousel.fulfilled,
        (state, action: PayloadAction<ClientCarouselItem>) => {
          const index = state.clientsCarousels.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.clientsCarousels[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateClientCarousel.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// Selectors
export const selectClientsCarousels = (state: RootState) =>
  state.clientsCarousel.clientsCarousels;
export const selectCurrentClientCarousel = (state: RootState) =>
  state.clientsCarousel.currentClientCarousel;
export const selectClientsCarouselLoading = (state: RootState) =>
  state.clientsCarousel.loading;
export const selectClientsCarouselError = (state: RootState) =>
  state.clientsCarousel.error;

// Export actions and reducer
export const { resetError, clearCurrentClientCarousel, removeClientCarousel } =
  clientCarouselSlice.actions;
export default clientCarouselSlice.reducer;
