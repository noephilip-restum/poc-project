import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ReviewTable } from "../../../components/table";
import thunk from "redux-thunk";
import {
  movieListData,
  userListMockData,
  reviewListMockData,
} from "../../mockValues";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<ReviewTable />", () => {
  const renderApp = () => {
    const initialState = {
      movies: movieListData,
      users: userListMockData,
      reviews: reviewListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewTable />
        </BrowserRouter>
      </Provider>
    );
  };

  const openDeleteUserModal = async () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    userEvent.click(deleteButton[0]);
  };

  const openEditUserModal = async () => {
    const editButton = screen.getAllByTestId("editButton");
    userEvent.click(editButton[0]);
  };

  beforeEach(() => {
    renderApp();
  });

  test("should render admin review page", () => {
    const userContent = screen.getByTestId("reviewContent");
    expect(userContent).toBeInTheDocument();
  });

  test("should render admin review table", () => {
    const userTable = screen.getByTestId("reviewTable");
    expect(userTable).toBeInTheDocument();
  });

  test("should render add review modal", async () => {
    openDeleteUserModal();
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  test("should render edit review modal", async () => {
    openEditUserModal();
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  test("should render modal title", async () => {
    openEditUserModal();
    const titleElement = screen.getByTestId("dialogTitle");
    expect(titleElement).toBeInTheDocument();
  });

  test("should display review delete button ", () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    console.log(deleteButton);
    expect(deleteButton.length).toBe(1);
  });

  test("should display review add edit button ", () => {
    const editButton = screen.getAllByTestId("editButton");
    console.log(editButton);
    expect(editButton.length).toBe(1);
  });

  test("should display dialog ", () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    userEvent.click(deleteButton[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  test("should display dialog title ", async () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    userEvent.click(deleteButton[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    waitFor(() => {
      const title = screen.findByText("Delete this User");
      expect(title).toBeInTheDocument();
    });
  });

  test("should close the modal", async () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    userEvent.click(deleteButton[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    waitFor(() => {
      const disagreeButton = screen.getByRole("button", {
        name: "disagree",
      });
      expect(disagreeButton).toBeInTheDocument();
      userEvent.click(disagreeButton);

      expect(dialog).not.toBeInTheDocument();
    });
  });
});
