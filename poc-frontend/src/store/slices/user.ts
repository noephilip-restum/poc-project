import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, returnError } from "types/User";
import { apiCall, setCookie, parseJwt, getCookie } from "utils/main";

interface UserState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  data: [],
  status: "idle",
  error: null,
};

export const getUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: returnError }
>("users/fetch", async (state, thunkAPI) => {
  const response = await apiCall("/users", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

  return response.data as User[];
});

export const editUser = createAsyncThunk<
  User,
  {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    account_status: string;
    account_role: string;
  },
  { rejectValue: string }
>("user/edit", async (payload, thunkAPI) => {
  const response = await apiCall(`/users/${payload._id}`, "PATCH", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as User;
});

export const deleteUser = createAsyncThunk<
  User,
  {
    id: string;
  },
  { rejectValue: string }
>("users/delete", async (payload, thunkAPI) => {
  console.log(payload);
  const response = await apiCall(`/users/${payload.id}`, "DELETE", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as User;
});

export const loginUser = createAsyncThunk<
  User,
  {
    email: string;
    password: string;
  },
  { rejectValue: string }
>("users/login", async (payload, thunkAPI) => {
  const response = await apiCall(`/users/login`, "POST", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  setCookie("token", response.data.token, 3);
  localStorage.setItem("loggedIn", parseJwt(getCookie("token")).id);

  return response.data as User;
});

export const signupUser = createAsyncThunk<
  User,
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    account_status: string;
    account_role: string;
  },
  { rejectValue: string }
>("users/signup", async (payload, thunkAPI) => {
  const response = await apiCall(`/users/signup`, "POST", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }

  return response.data as User;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "idle";
    });

    builder.addCase(getUsers.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(editUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(editUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(signupUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(signupUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});

export default userSlice.reducer;
