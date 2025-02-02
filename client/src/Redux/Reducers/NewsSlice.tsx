import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { INews } from "@/interfaces/News.interface";
import { WritableDraft } from "immer";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define the state structure
interface NewsState {
  newsData: WritableDraft<INews>[];
  currentNews: WritableDraft<INews> | null; // To hold the currently fetched news item
  loading: boolean;
  error: string | null;
  activeTab: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/news`;

// Thunk to fetch all news data
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
    });

    return response.data.data as INews[];
  } catch (error) {
    console.error("Fetch news error:", error);
    if (error instanceof AxiosError) {
      return error?.response?.data || "An unexpected error occurred.";
    }
  }
});

// Thunk to fetch a single news item by ID
export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (newsId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${newsId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to fetch news item."
        );
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to fetch a single news item by Slug
export const fetchNewsBySlug = createAsyncThunk(
  "news/fetchNewsBySlug",
  async (newsSlug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${newsSlug}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to fetch news item."
        );
      }
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to delete a news item
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (newsSlug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${newsSlug}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        const errorData = response.data;
        return rejectWithValue(
          errorData.message || "Failed to delete news item."
        );
      }

      dispatch(removeNews(newsSlug));
      return newsSlug;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to update a news item
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async (
    { updatedNews, id }: { updatedNews: FormData; id: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedNews, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        const errorData = response.data;
        return rejectWithValue(
          errorData.message || "Failed to update news item."
        );
      }

      const updatedItem = response.data;
      dispatch(setCurrentNews(updatedItem));
      return updatedItem;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Initial state
const initialState: NewsState = {
  newsData: [],
  activeTab: "1", // Default to "All News"
  currentNews: null, // Initially no news item selected
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    removeNews: (state, action: PayloadAction<string>) => {
      state.newsData = state.newsData.filter(
        (news: INews) => news._id !== action.payload
      );
    },
    setCurrentNews: (state, action) => {
      state.currentNews = action.payload; // Set the current news item
    },
    clearCurrentNews: (state) => {
      state.currentNews = null; // Clear the current news item
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.newsData = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load news data.";
      })
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload.data; // Set the fetched news item
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.newsData.findIndex(
          (news: { _id: string }) => news._id === action.payload._id
        );
        if (index !== -1) {
          state.newsData[index] = action.payload; // Update the news in the array
        }
        state.currentNews = action.payload; // Update current news item if applicable
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update news item.";
      })
      .addCase(fetchNewsBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload;
      })
      .addCase(fetchNewsBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

// Selector to get news item by ID
export const selectNewsById = (state: { news: NewsState }, newsId: string) => {
  return state.news.newsData.find((news) => news._id === newsId) || {};
};

// Export actions and reducer
export const { setActiveTab, removeNews, setCurrentNews, clearCurrentNews } =
  newsSlice.actions;
export default newsSlice.reducer;
