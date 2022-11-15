import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import GridWithInfiniteScroll from "../../components/GridWithInfiniteScroll";
import configureStore from "redux-mock-store";

import { actorListMockData } from "../mockValues";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

describe("<ActorExplore />", () => {
  const initialState = {
    actors: actorListMockData,
  };
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <GridWithInfiniteScroll data={actorListMockData} />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("check actor explore if not null should display title", () => {
    expect(screen.getByText("All Actors")).not.toBeNull();
  });

  test("should render actors list component", () => {
    const actorsList = screen.getByTestId(/list/);
    expect(actorsList).toBeInTheDocument();
  });

  test("should render component title", () => {
    const titleElement = screen.getByTestId(/title/);
    expect(titleElement).toBeInTheDocument();
  });

  test("should render actor card for each actor", () => {
    expect(screen.getByText("Dwayne Johnson")).not.toBeNull();
    expect(screen.getByText("Sarah Shahi")).not.toBeNull();
  });
});
