import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { UserTable } from "../../../components/table";
import thunk from "redux-thunk";
import { userListMockData } from "../../mockValues";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<UserTable />", () => {
  const renderApp = () => {
    const initialState = {
      users: userListMockData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <UserTable />
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

  test("should render admin users page", () => {
    const userContent = screen.getByTestId("userContent");
    expect(userContent).toBeInTheDocument();
  });

  test("should render admin users table", () => {
    const userTable = screen.getByTestId("userTable");
    expect(userTable).toBeInTheDocument();
  });

  test("should render add movie modal", async () => {
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

  test("should display delete button ", () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    expect(deleteButton.length).toBe(3);
  });

  test("should display edit button ", () => {
    const editButton = screen.getAllByTestId("editButton");
    expect(editButton.length).toBe(3);
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
