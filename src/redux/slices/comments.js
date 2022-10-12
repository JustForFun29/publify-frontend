import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCommentsLatest = createAsyncThunk(
  "comments/fetchCommentsLatest",
  async () => {
    const data = await axios.get("/comments");
    console.log("fetch results:", data.data);
    return data.data;
  }
);

export const fetchCommentsForPost = createAsyncThunk(
  "comments/fetchCommentsLatest",
  async (id) => {
    const data = await axios.get(`/comments/${id}`);
    console.log("fetch results:", data.data);
    return data.data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // Getting latest comments
    [fetchCommentsLatest.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchCommentsLatest.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentsLatest.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },

    // Getting comments for particular post
    [fetchCommentsForPost.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchCommentsForPost.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentsForPost.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
