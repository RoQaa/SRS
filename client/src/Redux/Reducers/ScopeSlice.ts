import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IScope } from "@/interfaces/Scope.interface";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define the state structure
interface ScopeState {
  scopesData: IScope[];
  currentScope: IScope | null;
  loading: boolean;
  error: string | null;
  activeTab: string;
}

const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/scopes`;

// Thunk to fetch all scope data
export const fetchScopes = createAsyncThunk(
  "scopes/fetchScopes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URI, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return [];
      }

      return response.data.data as IScope[];
    } catch (error) {
      console.error("Fetch scopes error:", error);
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch scopes"
        );
      }
      return [];
    }
  }
);

// Thunk to fetch a single scope item by ID
export const fetchScopeById = createAsyncThunk(
  "scopes/fetchScopeById",
  async (scopeId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/${scopeId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to fetch scope item."
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to delete a scope item
export const deleteScope = createAsyncThunk(
  "scopes/deleteScope",
  async (scopeSlug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URI}/${scopeSlug}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to delete scope item."
        );
      }

      dispatch(removeScope(scopeSlug));
      return scopeSlug;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to update a scope item
export const updateScope = createAsyncThunk(
  "scopes/updateScope",
  async (
    { updatedScope, id }: { updatedScope: FormData; id: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URI}/${id}`, updatedScope, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to update scope item."
        );
      }

      const updatedItem = response.data;
      dispatch(setCurrentScope(updatedItem)); // Dispatch action to set the current scope

      return updatedItem; // Return updated scope data for further processing if needed
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Initial state
const initialState: ScopeState = {
  scopesData: [],
  activeTab: "1",
  currentScope: null,
  loading: false,
  error: null,
};

const scopeSlice = createSlice({
  name: "scopes",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    removeScope: (state, action: PayloadAction<string>) => {
      state.scopesData = state.scopesData.filter(
        (scope: IScope) => scope._id !== action.payload
      );
    },
    setCurrentScope: (state, action) => {
      state.currentScope = action.payload;
    },
    clearCurrentScope: (state) => {
      state.currentScope = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScopes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScopes.fulfilled, (state, action) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.scopesData = action.payload;
      })
      .addCase(fetchScopes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load scopes data.";
      })
      .addCase(fetchScopeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScopeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScope = action.payload;
      })
      .addCase(fetchScopeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateScope.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScope.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.scopesData.findIndex(
          (scope) => scope._id === action.payload._id
        );
        if (index !== -1) {
          state.scopesData[index] = action.payload;
        }
        state.currentScope = action.payload;
      })
      .addCase(updateScope.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update scope item.";
      });
  },
});

// Selector to get scope item by ID
export const selectScopeById = (
  state: { scopes: ScopeState },
  scopeId: string
) => {
  return state.scopes.scopesData.find((scope) => scope._id === scopeId) || {};
};

// Export actions and reducer
export const { setActiveTab, removeScope, setCurrentScope, clearCurrentScope } =
  scopeSlice.actions;
export default scopeSlice.reducer;
