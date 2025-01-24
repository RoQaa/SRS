import { IUser } from "@/interfaces/User.interface";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export interface IUserData {
  _id?: string;
  fName: string;
  lName: string;
  email: string;
  role: string;
}

export interface UserState {
  isAuthenticated: boolean;
  user: IUserData | null;
  loading: boolean;
  error: string | null;
  allUsers: IUserData[];
  activeTab: string;
  token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
  allUsers: [],
  activeTab: "1",
};

const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }
      return await response.json(); // Return successful response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as Error).message || "An unknown error occurred."
      );
    }
  }
);

// Get All Users
export const getAllUsers = createAsyncThunk<IUserData[], void>(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      console.log(response.data);
      
      return response.data.data as IUserData[];
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch users"
        );
      }
      throw new Error("An unknown error occurred.");
    }
  }
);

// Get User By ID
export const getUserById = createAsyncThunk(
  "user/fetchById",
  async (id: string, { rejectWithValue }) => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      throw new Error("No authorization token found");
    }

    try {
      const response = await axios.get(`${API_URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data || "Failed to fetch user");
      }
    }
  }
);

// Add New User
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (userData: Partial<IUser>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URI}`, userData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to add new user"
        );
      }
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "user/update",
  async (
    { id, userData }: { id: string; userData: Partial<IUser> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URI}/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to update user"
        );
      }
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URI}/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      dispatch(removeUser(id))
      return id;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to delete user"
        );
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    logout(state) {
      state.user = null;
      state.allUsers = [];
    },
    setUser(state, action) {
      // Accept user data as payload
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeUser(state, action: PayloadAction<string>) {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          fName: action.payload.fname,
          lName: action.payload.lName,
          role: action.payload.role,
          email: action.payload.email,
        };
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to login. Please try again.";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user.";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      })
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.allUsers) {
          state.allUsers = [...state.allUsers, action.payload];
        } else {
          state.allUsers = [action.payload];
        }
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add new user";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.allUsers) {
          state.allUsers = state.allUsers.map((user: IUserData) =>
            user._id === action.payload._id ? action.payload : user
          ); // Update user in state
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user.";
      });
  },
});

export const selectUser = (state: { user: UserState }) => state.user.user;
export const { setActiveTab, setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
