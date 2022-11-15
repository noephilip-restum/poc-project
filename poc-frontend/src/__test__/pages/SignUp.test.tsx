import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import {
  actorListMockData,
  moviesMockData,
  reviewListMockData,
  userListMockData,
} from "../mockValues";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import SignUp from "pages/SignUp";

describe("<SignUpPage />", () => {
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
          <SignUp />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the title of the page", () => {
    expect(screen.getByText("Sign up")).not.toBeNull();
  });

  test("should render all elements", () => {
    const signupElement = screen.getByTestId("signup");
    expect(signupElement).toBeInTheDocument();
  });
});
