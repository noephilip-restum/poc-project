import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import AdminPage from "../../pages/AdminPage";
import configureStore from "redux-mock-store";

import {
  actorListMockData,
  moviesMockData,
  reviewListMockData,
  userListMockData,
} from "../mockValues";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

describe("<AdminPage />", () => {
  const initialState = {
    movies: moviesMockData,
    users: userListMockData,
    reviews: reviewListMockData,
    actors: actorListMockData,
  };
  const mockStore = configureStore([thunk]);
  let store = mockStore(initialState);
  const renderApp = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <AdminPage />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the Home page", () => {
    expect(screen.getByText("Admin Page")).not.toBeNull();
  });

  test("should render user avatar", () => {
    const avatarElement = screen.getByTestId(/avatar/);
    expect(avatarElement).toBeInTheDocument();
  });

  test("should render side nav", () => {
    const sideNavElement = screen.getByTestId(/sideNav/);
    expect(sideNavElement).toBeInTheDocument();
  });

  test("should render tables", () => {
    const tablesElement = screen.getByTestId(/tables/);
    expect(tablesElement).toBeInTheDocument();
  });
});
