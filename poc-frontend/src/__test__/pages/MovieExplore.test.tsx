import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import GridWithInfiniteScroll from "../../components/GridWithInfiniteScroll";
import configureStore from "redux-mock-store";

import { moviesMockData } from "../mockValues";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

describe("<MovieExplore />", () => {
  const initialState = {
    actors: moviesMockData,
  };
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <GridWithInfiniteScroll data={[]} />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("check if movies list is empty", () => {
    expect(screen.getByText("No Results Found")).not.toBeNull();
  });

  test("should render movies list component", () => {
    const actorsList = screen.getByTestId(/list/);
    expect(actorsList).toBeInTheDocument();
  });
});
