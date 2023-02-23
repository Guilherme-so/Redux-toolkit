import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "Learing Redux Toolkit",
    content: "Redux Toolkit the best Global state",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsup: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0,
    },
  },
  {
    id: 2,
    title: "Slices",
    content: "Slice always remind me of pizza",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsup: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffe: 0,
    },
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
            reactions: {
              thumbsup: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffe: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existentPost = state.find((post) => post.id === postId);
      if(existentPost) {
        existentPost.reactions[reaction]++
      }
    },
  },
});

export const getAllPosts = (state) => state.posts;

export const { addedForm } = postsSlice.actions;
export default postsSlice.reducer;
