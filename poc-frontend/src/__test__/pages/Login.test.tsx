import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Login from "../../pages/Login";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

import {
  actorListMockData,
  moviesMockData,
  reviewListMockData,
  userListMockData,
} from "../mockValues";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

describe("<LoginPage />", () => {
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
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => renderApp());

  test("renders the login page", () => {
    expect(screen.getByText("Sign in")).not.toBeNull();
  });

  test("should render all elements", () => {
    const loginElement = screen.getByTestId(/login/);
    expect(loginElement).toBeInTheDocument();
  });

  test("user able to input her/his email address", () => {
    const emailElement = screen.getByRole("textbox", {
      name: "Email Address",
    });
    if (emailElement) {
      userEvent.type(emailElement, "email@gmail.com");
    }
    expect(emailElement).toHaveDisplayValue("email@gmail.com");
  });

  test("user able to input her/his password", () => {
    const passElement = screen.getByLabelText("Password");
    if (passElement) {
      userEvent.type(passElement, "123");
    }
    expect(passElement).toHaveDisplayValue("123");
  });
});
