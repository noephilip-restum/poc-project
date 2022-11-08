import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie, returnError } from "types/Movies";
import { apiCall } from "utils/main";
const _ = require("lodash");

interface MovieState {
  data: {};
  currentMovie: {} | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  data: [],
  currentMovie: null,
  status: "idle",
  error: null,
};

export const createMovie = createAsyncThunk<
  Movie,
  {
    id: string;
    title: string;
    description: string;
    cost: number;
    actorIds: string[];
    image_link: string;
  },
  { rejectValue: string }
>("movies/add", async (payload, thunkAPI) => {
  const response = await apiCall(`/movies`, "POST", _.omit(payload, ["id"]));
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Movie;
});

export const getMovies = createAsyncThunk<
  Movie[],
  undefined,
  { rejectValue: returnError }
>("movies/fetch", async (state, thunkAPI) => {
  const response = await apiCall("/movies", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as Movie[];
});

export const getMovieById = createAsyncThunk<
  Movie,
  { id: string | null },
  { rejectValue: returnError }
>("movies/id/fetch", async (payload, thunkAPI) => {
  const response = await apiCall(`/movies/${payload.id}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as Movie;
});

export const editMovie = createAsyncThunk<
  Movie,
  {
    id: string;
    title: string;
    description: string;
    cost: number;
    actorIds: string[];
    image_link: string;
  },
  { rejectValue: string }
>("movies/edit", async (payload, thunkAPI) => {
  console.log(payload);
  const response = await apiCall(
    `/movies/${payload.id}`,
    "PATCH",
    _.omit(payload, ["actors", "reviews"])
  );
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Movie;
});

// export const loginUser = createAsyncThunk<
//   User,
//   {
//     email: string;
//     password: string;
//   },
//   { rejectValue: string }
// >("users/login", async (payload, thunkAPI) => {
//   const response = await apiCall(`/users/login`, "POST", payload);
//   if (!response.status) {
//     return thunkAPI.rejectWithValue(response.message);
//   }
//   setCookie("token", response.data.token, 3);
//   localStorage.setItem("loggedIn", parseJwt(getCookie("token")).id);

//   return response.data as User;
// });

// export const signupUser = createAsyncThunk<
//   User,
//   {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     account_status: string;
//     account_role: string;
//   },
//   { rejectValue: string }
// >("users/signup", async (payload, thunkAPI) => {
//   const response = await apiCall(`/users/signup`, "POST", payload);
//   if (!response.status) {
//     return thunkAPI.rejectWithValue(response.message);
//   }

//   return response.data as User;
// });

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(getMovies.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(createMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createMovie.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(createMovie.rejected, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(editMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editMovie.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(editMovie.rejected, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(getMovieById.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getMovieById.fulfilled, (state, { payload }) => {
      state.currentMovie = payload;
      state.status = "idle";
    });

    builder.addCase(getMovieById.rejected, (state, { payload }) => {
      state.status = "idle";
    });
  },
});

export default movieSlice.reducer;
