import reducer, {
  createMovie,
  deleteMovie,
  editMovie,
  getMovieById,
  getMovies,
  getSearchMovies,
} from "../../store/slices/movie";
import { moviesMock, selectedMovieMock } from "../mockValues";

interface MovieState {
  data: {};
  currentMovie: {} | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

describe("Movie Slice ExtraReducers", () => {
  const initialState: MovieState = {
    data: [],
    currentMovie: null,
    status: "idle",
    error: null,
  };
  describe("getMovies", () => {
    it("pending", () => {
      const action = { type: getMovies.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = { type: getMovies.fulfilled.type, payload: moviesMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: moviesMock,
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getMovies.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });
  });

  describe("getMovieById", () => {
    it("pending", () => {
      const action = { type: getMovieById.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getMovieById.fulfilled.type,
        payload: selectedMovieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: selectedMovieMock,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getMovieById.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });
  });

  describe("addMovie", () => {
    it("pending", () => {
      const action = { type: createMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: createMovie.fulfilled.type,
        payload: selectedMovieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: createMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });
  });

  describe("deleteMovie", () => {
    it("pending", () => {
      const action = { type: deleteMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteMovie.fulfilled.type,
        payload: selectedMovieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });
  });

  describe("editMovie", () => {
    it("pending", () => {
      const action = { type: editMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editMovie.fulfilled.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: editMovie.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });
  });

  describe("searchMovies", () => {
    it("pending", () => {
      const action = { type: getSearchMovies.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getSearchMovies.fulfilled.type,
        payload: moviesMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: moviesMock,
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getSearchMovies.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        currentMovie: null,
        status: "idle",
        error: null,
      });
    });
  });
});
