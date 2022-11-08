import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import actorReducer from "./slices/actor";
import reviewReducer from "./slices/review";
import movieReducer from "./slices/movie";

const store = configureStore({
  reducer: {
    users: userReducer,
    actors: actorReducer,
    movies: movieReducer,
    reviews: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
