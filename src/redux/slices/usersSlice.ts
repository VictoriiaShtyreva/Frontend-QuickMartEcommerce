import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { User, UserInitialState, UserRegister } from "../../types/User";
import {
  Authentication,
  AuthenticationToken,
} from "../../types/Authentication";
import { error } from "console";

const initialState: UserInitialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

//Fetch data
const URL = "https://api.escuelajs.co/api/v1/users";
const profileUrl = "https://api.escuelajs.co/api/v1/auth/profile";
const loginUrl = "https://api.escuelajs.co/api/v1/auth/login";

//Define thunk for fetching all users
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User[]> = await axios.get(URL);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//Define thunk for register new user
export const registerUser = createAsyncThunk(
  "registerUser",
  async (newUser: UserRegister, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User> = await axios.post(
        `${URL}/`,
        newUser
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//Define thunk for user with session
const getAuthentication = createAsyncThunk(
  "getAuthentication",
  async (access_token: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User> = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//Define thunk for login user
export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials: Authentication, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<AuthenticationToken> = await axios.post(
        loginUrl,
        credentials
      );
      localStorage.setItem("token", response.data.access_token);
      const authentication = await dispatch(
        getAuthentication(response.data.access_token)
      );
      return authentication.payload as User;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//Define slice for users
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      window.localStorage.clear();
      return state;
    },
  },
  extraReducers: (builder) => {
    //Fetch all users
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(getAllUsers.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Register user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          users: state.users.concat(action.payload),
          user: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(registerUser.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Get authentication
    builder.addCase(getAuthentication.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          users: state.users.concat(action.payload),
          user: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(getAuthentication.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getAuthentication.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Login user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        return {
          ...state,
          users: state.users.concat(action.payload),
          user: action.payload,
          loading: false,
        };
      }
    });
    builder.addCase(loginUser.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          loading: false,
          error: action.error.message ?? "An error occurred",
        };
      }
    });
  },
});

const userReducer = usersSlice.reducer;
export const { logout } = usersSlice.actions;
export default userReducer;
