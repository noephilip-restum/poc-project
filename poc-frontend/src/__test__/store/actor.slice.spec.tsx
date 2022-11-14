import reducer, {
  getActors,
  createActor,
  deleteActor,
  editActor,
  getSearchActors,
} from "../../store/slices/actor";
import { actorsMock } from "../mockValues";

interface ActorState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

describe("Actor Slice ExtraReducers", () => {
  const initialState: ActorState = {
    data: [],
    status: "loading",
    error: null,
  };

  describe("addActor", () => {
    it("pending", () => {
      const action = { type: createActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = { type: createActor.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: createActor.rejected.type,
        error: { message: "error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "idle",
        error: "Error Encountered Adding Actor",
      });
    });
  });

  describe("getAllActors", () => {
    it("pending", () => {
      const action = { type: getActors.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = { type: getActors.fulfilled.type, payload: actorsMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: actorsMock,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getActors.rejected.type,
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
      const action = { type: deleteActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteActor.fulfilled.type,
        payload: actorsMock,
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
        type: deleteActor.rejected.type,
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
      const action = { type: editActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: editActor.fulfilled.type,
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
        type: editActor.rejected.type,
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

  describe("searchActors", () => {
    it("pending", () => {
      const action = { type: getSearchActors.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: [],
        status: "loading",
        error: null,
      });
    });

    it("fulfilled", () => {
      const action = {
        type: getSearchActors.fulfilled.type,
        payload: actorsMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        data: actorsMock,
        status: "idle",
        error: null,
      });
    });

    it("rejected", () => {
      const action = {
        type: getSearchActors.rejected.type,
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
