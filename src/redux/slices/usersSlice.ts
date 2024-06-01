import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

import { User, UserRegister, UserState } from "../../types/User";
import { QueryOptions } from "../../types/QueryOptions";

const initialState: UserState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  filteredUsers: [],
  total: 0,
  userDetails: {},
};

//Fetch data
const API_BASE_URL = process.env.REACT_APP_API_URL;
const URL = `${API_BASE_URL}/users`;
const profileUrl = `${API_BASE_URL}/auth/authenticate`;
const loginUrl = `${API_BASE_URL}/auth/login`;

//Queries
const createQueryString = (options: QueryOptions) => {
  const params = new URLSearchParams();
  params.append("page", options.page.toString());
  params.append("pageSize", options.pageSize.toString());
  params.append("sortBy", options.sortBy);
  params.append("sortOrder", options.sortOrder);
  return params.toString();
};

//Define thunk for fetching all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (options: QueryOptions, { rejectWithValue }) => {
    try {
      const queryString = createQueryString(options);
      const response = await axios.get(`${URL}?${queryString}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk<User, Partial<User>>(
  "user/update",
  async (userData, thunkAPI) => {
    try {
      const formData = new FormData();
      if (userData.name) formData.append("name", userData.name);
      if (userData.email) formData.append("email", userData.email);
      if (userData.avatar) formData.append("avatar", userData.avatar as File);
      const response = await axios.patch(`${URL}/${userData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for register new user
export const registerUser = createAsyncThunk<User, UserRegister>(
  "users/registerUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", newUser.name);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("role", "Customer");
      if (newUser.avatar) {
        formData.append("avatar", newUser.avatar);
      }

      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//Define thunk for user with session
export const authenticateUser = createAsyncThunk(
  "users/authenticateUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await axios.get(profileUrl, {
        params: { token },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(loginUrl, credentials);
      const token = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userResponse = await axios.get(profileUrl, {
        params: { token },
      });
      return userResponse.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${URL}/${id}`);
      return id;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Define thunk for updating user password
export const updateUserPassword = createAsyncThunk<
  void,
  { id: string; newPassword: string }
>("user/updatePassword", async ({ id, newPassword }, thunkAPI) => {
  try {
    const response = await axios.patch(
      `${URL}/${id}/update-password`,
      newPassword,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Define thunk for updating user role
export const updateUserRole = createAsyncThunk<
  User,
  { id: string; role: string }
>("user/updateRole", async ({ id, role }, thunkAPI) => {
  try {
    const response = await axios.patch(
      `${URL}/${id}/update-role`,
      { newRole: role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Define thunk for resetting user password
export const resetUserPassword = createAsyncThunk<
  void,
  { id: string; newPassword: string }
>("user/resetPassword", async ({ id, newPassword }, thunkAPI) => {
  try {
    const response = await axios.patch(
      `${URL}/${id}/reset-password`,
      JSON.stringify(newPassword),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//Define slice for users
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      delete axios.defaults.headers.common["Authorization"];
    },
    saveUserInformation: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    sortUsersByName: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    searchUsersByName: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery)
      );
    },
    clearUsersSearch: (state) => {
      state.filteredUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    //Fetch all users
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload.items,
        filteredUsers: action.payload.items,
        total: action.payload.totalCount,
        loading: false,
        error: null,
      };
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Fetch user by id
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<User>) => {
        const user = action.payload;
        state.userDetails[user.id] = user;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      }
    );
    builder.addCase(fetchUserById.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });

    // Update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.error = null;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Authenticate user
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(authenticateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete user
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.error = null;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update user role
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.error = null;
    });
    builder.addCase(updateUserRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Reset user password
    builder.addCase(resetUserPassword.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(resetUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const userReducer = usersSlice.reducer;
export const {
  logout,
  saveUserInformation,
  sortUsersByName,
  searchUsersByName,
  clearUsersSearch,
} = usersSlice.actions;
export default userReducer;
