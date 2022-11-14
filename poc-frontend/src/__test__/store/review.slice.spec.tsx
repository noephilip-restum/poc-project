import reducer, {
  createReview,
  deleteReview,
  editReview,
  getReview,
} from "../../store/slices/review";

import { selectedMovieReviewMock, pendingReviewsMock } from "../mockValues";

interface ReviewState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

describe("Review Slice ExtraReducers", () => {
  const initialState: ReviewState = {
    data: [],
    status: "idle",
    error: null,
  };

  describe("addReview", () => {
    it("pending", () => {
      const action = { type: createReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = { type: createReview.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: createReview.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });
  });

  describe("getMovieReviews", () => {
    it("pending", () => {
      const action = { type: getReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getReview.fulfilled.type,
        payload: pendingReviewsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: pendingReviewsMock,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getReview.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });
  });

  describe("editActor", () => {
    it("pending", () => {
      const action = { type: editReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editReview.fulfilled.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: editReview.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });
  });

  describe("deleteActor", () => {
    it("pending", () => {
      const action = { type: deleteReview.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteReview.fulfilled.type,
        payload: selectedMovieReviewMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteReview.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });
  });
});
