import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review, returnError } from "types/Review";
import { apiCall } from "utils/main";
const _ = require("lodash");

interface ActorState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActorState = {
  data: [],
  status: "idle",
  error: null,
};

export const getReview = createAsyncThunk<
  Review[],
  undefined,
  { rejectValue: returnError }
>("reviews/fetch", async (state, thunkAPI) => {
  const response = await apiCall("/reviews", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as Review[];
});

export const editReview = createAsyncThunk<
  Review,
  {
    id: string;
    message: string;
    rating: number | null;
    review_status: boolean;
    movieId: string;
    usersId: string;
  },
  { rejectValue: string }
>("reviews/edit", async (payload, thunkAPI) => {
  console.log(payload);
  const response = await apiCall(
    `/reviews/${payload.id}`,
    "PATCH",
    _.omit(payload, ["users"])
  );
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Review;
});

export const deleteReview = createAsyncThunk<
  Review,
  {
    id: string;
  },
  { rejectValue: string }
>("review/delete", async (payload, thunkAPI) => {
  const response = await apiCall(`/reviews/${payload.id}`, "DELETE", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Review;
});

export const createReview = createAsyncThunk<
  Review,
  {
    id: string;
    message: string;
    rating: number | null;
    review_status: boolean;
    movieId: string;
    usersId: string;
  },
  { rejectValue: string }
>("review/add", async (payload, thunkAPI) => {
  const response = await apiCall(`/reviews`, "POST", _.omit(payload, ["id"]));
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Review;
});

export const reviewSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getReview.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(getReview.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(editReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editReview.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(editReview.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(createReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createReview.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(createReview.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(deleteReview.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteReview.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(deleteReview.rejected, (state, { payload }) => {
      state.status = "idle";
    });
  },
});

export default reviewSlice.reducer;
