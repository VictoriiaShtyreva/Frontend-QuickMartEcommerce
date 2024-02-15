import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../misc/types/User";

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

//getuserinfro from localstore
const data = localStorage.getItem("user");
if (data) {
  initialState.user = JSON.parse(data);
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUserInformation: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

const userReducer = usersSlice.reducer;
export const { saveUserInformation } = usersSlice.actions;
export default userReducer;
