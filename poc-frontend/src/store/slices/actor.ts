import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Actor, returnError } from "types/Actor";
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

export const getActors = createAsyncThunk<
  Actor[],
  undefined,
  { rejectValue: returnError }
>("actors/fetch", async (state, thunkAPI) => {
  const response = await apiCall("/actors", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as Actor[];
});

export const getSearchActors = createAsyncThunk<
  Actor[],
  { name: string },
  { rejectValue: returnError }
>("actors/search/fetch", async (payload, thunkAPI) => {
  const response = await apiCall(`/actors/search/${payload.name}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as Actor[];
});

export const editActor = createAsyncThunk<
  Actor,
  {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    image_link: string;
  },
  { rejectValue: string }
>("actors/edit", async (payload, thunkAPI) => {
  const response = await apiCall(`/actors/${payload.id}`, "PATCH", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Actor;
});

export const deleteActor = createAsyncThunk<
  Actor,
  {
    id: string;
  },
  { rejectValue: string }
>("actors/delete", async (payload, thunkAPI) => {
  const response = await apiCall(`/actors/${payload.id}`, "DELETE", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Actor;
});

export const createActor = createAsyncThunk<
  Actor,
  {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    image_link: string;
  },
  { rejectValue: string }
>("actors/add", async (payload, thunkAPI) => {
  const response = await apiCall(`/actors`, "POST", _.omit(payload, ["id"]));
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as Actor;
});

export const actorSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActors.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getActors.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(getActors.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(getSearchActors.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getSearchActors.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(getSearchActors.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(editActor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editActor.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(editActor.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(createActor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createActor.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(createActor.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
      state.error = "Error Encountered Adding Actor";
    });

    builder.addCase(deleteActor.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteActor.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(deleteActor.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export default actorSlice.reducer;
