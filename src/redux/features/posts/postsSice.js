import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  try {
    const resp = await fetch(API_URL);
    const data = await resp.json();
    return data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const data = response.json();
    return data;
  } catch (erro) {
    console.log(erro);
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
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        const fetchedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            like: 0,
            dislike: 0,
            heart: 0,
            star: 0,
          };
          return post;
        });

        state.posts = state.posts.concat(fetchedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          like: 0,
          dislike: 0,
          heart: 0,
          star: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addedForm, addedReactions } = postsSlice.actions;
export default postsSlice.reducer;
