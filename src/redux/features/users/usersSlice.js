import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const USER_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch(USER_URL);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
});

export const getAllUsers = (state) => state.users;
export default usersSlice.reducer;
