import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ActorTable } from "../../../components/table";
import thunk from "redux-thunk";
import { actorListData, movieListData } from "../../mockValues";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<ActorTable />", () => {
  const renderApp = () => {
    const initialState = {
      actors: actorListData,
      movies: movieListData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ActorTable />
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

  test("should render admin actors page", () => {
    const userContent = screen.getByTestId("actorContent");
    expect(userContent).toBeInTheDocument();
  });

  test("should render admin actors table", () => {
    const userTable = screen.getByTestId("actorTable");
    expect(userTable).toBeInTheDocument();
  });

  test("should render add actors modal", async () => {
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

  test("should display actors delete button ", () => {
    const deleteButton = screen.getAllByTestId("deleteButton");
    console.log(deleteButton);
    expect(deleteButton.length).toBe(2);
  });

  test("should display actors add edit button ", () => {
    const editButton = screen.getAllByTestId("editButton");
    console.log(editButton);
    expect(editButton.length).toBe(2);
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
