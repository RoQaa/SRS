import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export interface SeoData {
  page: string;
  title_en: string;
  title_ar: string;
  meta_description_en?: string;
  meta_description_ar?: string;
  keywords_en?: string[];
  keywords_ar?: string[];
  og_title_en?: string;
  og_title_ar?: string;
  og_description_en?: string;
  og_description_ar?: string;
  og_image?: string | File | null;
}

interface SeoState {
  allSeoData: SeoData[] | null;
  seoData: SeoData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SeoState = {
  allSeoData: null,
  seoData: null,
  loading: false,
  error: null,
};

const SEO_API = `${process.env.NEXT_PUBLIC_API_URL}/seo`;

// Fetch SEO data for all pages
export const fetchAllSeoPages = createAsyncThunk<SeoData[], void>(
  "seo/fetchAllSeoPages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SEO_API}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch SEO data"
        );
      }
    }
  }
);

// Fetch SEO data by page
export const fetchSeoByPage = createAsyncThunk<SeoData, string>(
  "seo/fetchSeoByPage",
  async (pageName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SEO_API}/findByPage/${pageName}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch SEO data"
        );
      }
    }
  }
);

// Add SEO data
export const addSeo = createAsyncThunk(
  "seo/addSeo",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SEO_API}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to add SEO data"
        );
      }
    }
  }
);
// Update SEO data
export const updateSeo = createAsyncThunk(
  "seo/updateSeo",
  async (
    { formData, page }: { formData: FormData; page: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${SEO_API}/findByPage/${page}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to update SEO data"
        );
      }
    }
  }
);

// Delete SEO data by page
export const deleteSeoByPage = createAsyncThunk<void, string>(
  "seo/deleteSeoByPage",
  async (pageName: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${SEO_API}/findByPage/${pageName}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      dispatch(removeSeo(pageName));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || "Failed to delete SEO data"
        );
      }
    }
  }
);

// Create the SEO slice
const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    resetSeoState: (state) => {
      state.allSeoData = null;
      state.seoData = null;
      state.loading = false;
      state.error = null;
    },
    removeSeo: (state, action) => {
      state.allSeoData =
        state.allSeoData?.filter((item) => item.page !== action.payload) ??
        null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSeoPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllSeoPages.fulfilled,
        (state, action: PayloadAction<SeoData[]>) => {
          state.loading = false;
          state.allSeoData = action.payload;
        }
      )
      .addCase(fetchAllSeoPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch all SEO data";
      })
      .addCase(fetchSeoByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSeoByPage.fulfilled,
        (state, action: PayloadAction<SeoData>) => {
          state.loading = false;
          console.log("action.payload", action.payload);
          
          state.seoData = action.payload;
        }
      )
      .addCase(fetchSeoByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch SEO data";
      })
      .addCase(addSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSeo.fulfilled, (state, action: PayloadAction<SeoData>) => {
        state.loading = false;
        state.allSeoData = [...(state.allSeoData ?? []), action.payload];
      })
      .addCase(addSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add SEO data";
      })
      .addCase(updateSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeo.fulfilled, (state, action: PayloadAction<SeoData>) => {
        state.loading = false;
        state.allSeoData =
          state.allSeoData?.map((item) =>
            item.page === action.payload.page ? action.payload : item
          ) ?? [];
      })
      .addCase(updateSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update SEO data";
      });
  },
});

export const { resetSeoState, removeSeo } = seoSlice.actions;

export default seoSlice.reducer;
