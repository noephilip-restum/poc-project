import reducer, {
  deleteUser,
  getUsers,
  loginUser,
  signupUser,
} from "../../store/slices/user";
import { currentUserMock, userMock } from "../mockValues";

interface UserState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

describe("User Slice Reducers", () => {
  const initialState: UserState = {
    data: [],
    status: "idle",
    error: null,
  };

  describe("loginUser", () => {
    it("pending", () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: currentUserMock,
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
        type: loginUser.rejected.type,
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

  describe("signupUser", () => {
    it("pending", () => {
      const action = { type: signupUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: signupUser.fulfilled.type,
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
        type: signupUser.rejected.type,
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

  describe("getUsers", () => {
    it("pending", () => {
      const action = { type: getUsers.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getUsers.fulfilled.type,
        payload: userMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: userMock,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getUsers.rejected.type,
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

  describe("deleteUser", () => {
    it("pending", () => {
      const action = { type: deleteUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteUser.fulfilled.type,
        payload: currentUserMock,
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
        type: deleteUser.rejected.type,
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
