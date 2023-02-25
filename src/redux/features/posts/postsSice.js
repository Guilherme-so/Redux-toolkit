import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  try {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    return data;
  } catch (err) {
    return err.message
  }
});


const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addedForm: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
              like: 0,
              dislike: 0,
              heart: 0,
              star: 0,
            },
          },
        };
      },
    },
    addedReactions: (state, action) => {
      const { postId, reaction } = action.payload;
      const existentPost = state.posts.find((post) => post.id === postId);

      existentPost.reactions[reaction]++;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";

      let min = 1;
      const fetchedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          like: "0",
          dislike: "0",
          heart: "0",
          star: "0",
        };
        return post;
      });

      state.posts = state.posts.concat(fetchedPosts);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addedForm, addedReactions } = postsSlice.actions;
export default postsSlice.reducer;
