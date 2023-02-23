import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "Learing Redux Toolkit",
    content: "Redux Toolkit the best Global state",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: 2,
    title: "Slices",
    content: "Slice always remind me of pizza",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addedForm: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, authorId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            authorId,
          },
        };
      },
    },
  },
});

export const getAllPosts = (state) => state.posts;

export const { addedForm } = postsSlice.actions;
export default postsSlice.reducer;
