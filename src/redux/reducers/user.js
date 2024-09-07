import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

const { setUser, logout } = actions;

export { userReducer, setUser, logout };
