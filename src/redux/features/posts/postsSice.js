import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  try {
    const resp = await axios.get(API_URL);
    return resp.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
  try {
    const response = await axios.post(API_URL, post);
    return response.data;
  } catch (erro) {
    console.log(erro);
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async (post) => {
  try {
    const response = await axios.put(`${API_URL}/${post.id}`, post);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (post) => {
  try {
    const response = await axios.delete(`${API_URL}/${post.id}`);
    if (response?.status === 200) return post;
    return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
    return err.message;
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
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("update could not complete");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id != id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("post nao encontrado para deletar");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { addedForm, addedReactions } = postsSlice.actions;
export default postsSlice.reducer;
