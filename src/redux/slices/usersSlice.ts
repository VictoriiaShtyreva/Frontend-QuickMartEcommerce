import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { User, UserInitialState, UserRegister } from "../../types/User";
import {
  Authentication,
  AuthenticationToken,
} from "../../types/Authentication";

const initialState: UserInitialState = {
  //the currently logged-in user
  user: null,
  //all aray of users
  users: [],
  loading: false,
  error: null,
  access_token: null,
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

//Define thunk for fetching single user
export const fetchUserById = createAsyncThunk(
  "fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User> = await axios.get(`${URL}/${id}`);
      return { data: response.data, id };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// Define thunk for update user
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, ...updatedProps }: User, { rejectWithValue, dispatch }) => {
    try {
      const response: AxiosResponse<User> = await axios.put(
        `${URL}/${id}`,
        updatedProps
      );
      const updatedUser = response.data;
      dispatch(saveUserInformation(updatedUser));
      return updatedUser;
    } catch (e) {
      rejectWithValue(e);
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
      // Store token
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
      return state;
    },
    saveUserInformation: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    saveAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
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
    //Fetch user by id
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        const { id } = action.payload;
        return {
          ...state,
          users: state.users.filter((user) => user.id !== id),
          loading: false,
        };
      }
    });
    builder.addCase(fetchUserById.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? "error",
      };
    });
    //Update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (!(action.payload instanceof AxiosError)) {
        const user = action.payload;
        return {
          ...state,
          loading: false,
          users: state.users.map((item) =>
            item.id === user?.id ? user : item
          ),
        };
      }
    });
    builder.addCase(updateUser.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
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
export const { logout, saveUserInformation } = usersSlice.actions;
export default userReducer;
function setToken(access_token: string): any {
  throw new Error("Function not implemented.");
}
