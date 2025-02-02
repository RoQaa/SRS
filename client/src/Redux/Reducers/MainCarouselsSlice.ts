import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import axios from "axios";
import Cookies from "js-cookie";

// Define Carousel interface
interface CarouselItem {
  _id?: string;
  id?: string;
  title: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  link?: string;
  image: string;
  published: string;
  publish?: string;
}

interface CarouselState {
  mainCarousels: CarouselItem[];
  currentCarousel: CarouselItem | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CarouselState = {
  mainCarousels: [],
  currentCarousel: null,
  loading: false,
  error: null,
};

// API URI
const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/slide`;
const token = Cookies.get("auth_token");
// Async thunk for fetching all carousel items
export const fetchMainCarousels = createAsyncThunk(
  "carousel/fetchMainCarousels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/?type=MainCarousel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          error?.message || "Failed to fetch main carousels"
        );
      }
    }
  }
);

// Async thunk for fetching a single carousel item by ID
export const fetchMainCarouselById = createAsyncThunk(
  "carousel/fetchMainCarouselById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error?.message || "Failed to fetch carousel");
      }
    }
  }
);

// Async thunk for adding a new carousel item
export const addMainCarousel = createAsyncThunk(
  "carousel/addMainCarousel",
  async (newItem: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URI, newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error?.message || "Failed to add main carousel");
      }
    }
  }
);

// Async thunk for updating an existing carousel item
export const updateMainCarousel = createAsyncThunk(
  "carousel/updateMainCarousel",
  async (
    { id, updatedItem }: { id: string; updatedItem: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URI}/${id}`, updatedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error?.message || "Failed to Update carousel");
      }
    }
  }
);

// Async thunk for deleting a carousel item
export const deleteMainCarousel = createAsyncThunk(
  "carousel/deleteMainCarousel",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeMainCarousel(id));
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error?.message || "Failed to delete carousel");
      }
    }
  }
);

// Carousel slice
const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    clearCurrentCarousel(state) {
      state.currentCarousel = null;
    },
    removeMainCarousel: (state, action: PayloadAction<string>) => {
      state.mainCarousels = state.mainCarousels.filter(
        (carousel) => carousel._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMainCarousels.fulfilled,
        (state, action: PayloadAction<CarouselItem[]>) => {
          state.loading = false;
          state.mainCarousels = action.payload;
        }
      )
      .addCase(fetchMainCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMainCarouselById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMainCarouselById.fulfilled,
        (state, action: PayloadAction<CarouselItem>) => {
          state.loading = false;
          state.currentCarousel = action.payload;
        }
      )
      .addCase(fetchMainCarouselById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addMainCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addMainCarousel.fulfilled,
        (state, action: PayloadAction<CarouselItem>) => {
          state.mainCarousels.push(action.payload);
        }
      )
      .addCase(addMainCarousel.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateMainCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateMainCarousel.fulfilled,
        (state, action: PayloadAction<CarouselItem>) => {
          const index = state.mainCarousels.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.mainCarousels[index] = action.payload;
          }
        }
      )
      .addCase(updateMainCarousel.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectMainCarousels = (state: RootState) =>
  state.mainCarousels.mainCarousels;
export const selectCurrentCarousel = (state: RootState) =>
  state.mainCarousels.currentCarousel;
export const selectCarouselLoading = (state: RootState) =>
  state.mainCarousels.loading;
export const selectCarouselError = (state: RootState) =>
  state.mainCarousels.error;

// Export actions and reducer
export const { resetError, clearCurrentCarousel, removeMainCarousel } =
  carouselSlice.actions;
export default carouselSlice.reducer;
