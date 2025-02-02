import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define Media interface
interface MediaItem {
  _id?: string;
  id?: string;
  title?: string;
  title_ar?: string;
  thumbnail?: string;
  full?: string;
  video?: string;
  type: string;
  published: boolean;
  fullImage?: string;
}

interface MediaState {
  mediaItems: MediaItem[];
  currentMediaItem: MediaItem | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MediaState = {
  mediaItems: [],
  currentMediaItem: null,
  loading: false,
  error: null,
};

// API URI
const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/media`;

// Async thunk for fetching all media items
export const fetchMediaItems = createAsyncThunk(
  "media/fetchMediaItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URI, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch media items"
        );
      }
    }
  }
);

// Async thunk for fetching a single media item by ID
export const fetchMediaItemById = createAsyncThunk(
  "media/fetchMediaItemById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch media by ID"
        );
      }
    }
  }
);

// Async thunk for adding a new media item
export const addMediaItem = createAsyncThunk(
  "media/addMediaItem",
  async (newItem: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URI, newItem, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to add media item"
        );
      }
    }
  }
);

// Async thunk for deleting a media item
export const deleteMediaItem = createAsyncThunk(
  "media/deleteMediaItem",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      dispatch(removeMediaItem(id));
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to delete media item");
      }
    }
  }
);

// Media slice
const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    clearCurrentMediaItem(state) {
      state.currentMediaItem = null;
    },
    removeMediaItem: (state, action: PayloadAction<string>) => {
      state.mediaItems = state.mediaItems.filter(
        (media) => media._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMediaItems.fulfilled,
        (state, action: PayloadAction<MediaItem[]>) => {
          state.loading = false;
          state.mediaItems = action.payload;
        }
      )
      .addCase(fetchMediaItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMediaItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMediaItemById.fulfilled,
        (state, action: PayloadAction<MediaItem>) => {
          state.loading = false;
          state.currentMediaItem = action.payload;
        }
      )
      .addCase(fetchMediaItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addMediaItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addMediaItem.fulfilled,
        (state, action: PayloadAction<MediaItem>) => {
          state.mediaItems.push(action.payload);
        }
      )
      .addCase(addMediaItem.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectMediaItems = (state: RootState) => state.media.mediaItems;
export const selectCurrentMediaItem = (state: RootState) =>
  state.media.currentMediaItem;
export const selectMediaLoading = (state: RootState) => state.media.loading;
export const selectMediaError = (state: RootState) => state.media.error;

// Selector for filtering media items by type
export const selectMediaByType = (type: string) => (state: RootState) =>
  state.media.mediaItems.filter((media) => media.type === type);

// Export actions and reducer
export const { resetError, clearCurrentMediaItem, removeMediaItem } =
  mediaSlice.actions;
export default mediaSlice.reducer;
