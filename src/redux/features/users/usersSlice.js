import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Ellon Musk" },
  { id: 2, name: "Mark Zukemberg" },
  { id: 3, name: "Guilherme" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const getAllUsers = (state) => state.users;
export default usersSlice.reducer;
