import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MovieTable } from "../../../components/table";
import thunk from "redux-thunk";
import { movieListData, actorListData } from "../../mockValues";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<MovieTable />", () => {
  const renderApp = () => {
    const initialState = {
      movies: movieListData,
      actors: actorListData,
    };
    const mockStore = configureStore([thunk]);
    let store;
    store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MovieTable />
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
    const userContent = screen.getByTestId("movieContent");
    expect(userContent).toBeInTheDocument();
  });

  test("should render admin review table", () => {
    const userTable = screen.getByTestId("movieTable");
    expect(userTable).toBeInTheDocument();
  });

  test("should render delete review modal", async () => {
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
    expect(deleteButton.length).toBe(3);
  });

  test("should display review add edit button ", () => {
    const editButton = screen.getAllByTestId("editButton");
    expect(editButton.length).toBe(3);
  });

  //   test("should display dialog title", () => {
  //     const editButton = screen.getAllByTestId("editButton");
  //     const dialogElement = screen.getByRole("dialog");

  //     const title = screen.getByTestId("dialogTitle");
  //     expect(title).toBeInTheDocument();
  //   });

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
