import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Actor } from "types/Actor";
import { Movie } from "types/Movies";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getMovies } from "store/slices/movie";
import {
  getActors,
  editActor,
  createActor,
  deleteActor,
} from "store/slices/actor";
import {
  AddEditActorModal,
  DeleteActorModal,
} from "components/modal/ActorModals";
import { showSuccessAlert, showErrorAlert } from "components/alert";

const actorState: Actor = {
  id: "",
  firstName: "",
  lastName: "",
  gender: "",
  age: 0,
  image_link: "",
};

export const ActorTable = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.data as Actor[]);
  const movies = useAppSelector((state) => state.movies.data as Movie[]);
  const [actor, setActor] = React.useState<Actor>(actorState);
  const [trigger, setTrigger] = React.useState(false as boolean);
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
    add: false,
  });

  useEffect(() => {
    dispatch(getActors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleClickOpen = async (value: number, option: any) => {
    let tempActor: any = actors.find((actor) => actor.id === value.toString());
    setActor(tempActor);
    setOpen({ ...open, [option]: true });
  };

  const handleClose = () => {
    setOpen({ delete: false, edit: false, add: false });
  };

  const handleEditSubmit = () => {
    dispatch(editActor(actor))
      .unwrap()
      .then((res: any) => {
        if (!res.status) {
          showErrorAlert(res.message);
        } else {
          setTrigger(!trigger);
          handleClose();
          showSuccessAlert(res.message);
        }
      })
      .catch((error) => showErrorAlert(error));
  };

  const handleDeleteSubmit = () => {
    let checkActor = movies.map((movie) =>
      movie.actors?.find((data) => data.id === actor.id)
    );
    checkActor = checkActor.filter((item) => !!item);
    checkActor.length === 0
      ? dispatch(deleteActor(actor))
          .unwrap()
          .then(() => {
            showSuccessAlert("Actor is successfully deleted");
            setTrigger(!trigger);
            handleClose();
          })
          .catch((error) => showErrorAlert(error))
      : showErrorAlert("Actor is casted to movies");
  };

  const handleAddSubmit = () => {
    dispatch(createActor(actor))
      .unwrap()
      .then((res: any) => {
        if (!res.status) {
          showErrorAlert(res.message);
        } else {
          setTrigger(!trigger);
          handleClose();
          showSuccessAlert(res.message);
        }
      })
      .catch((error) => showErrorAlert(error));
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value =
      name === "age" ? parseInt(event.target.value) : event.target.value;

    setActor({ ...actor, [name]: value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setActor({ ...actor, gender: event.target.value });
  };

  const columns = [
    {
      name: "image_link",
      label: "Avatar",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return (
            <>
              <Avatar src={`${value}`} />
            </>
          );
        },
      },
    },

    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: { filter: true, sort: true },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: number) => {
          return (
            <>
              <Button
                data-testid="editButton"
                onClick={() => handleClickOpen(value, "edit")}
              >
                Edit
              </Button>
              <Button
                data-testid="deleteButton"
                onClick={() => handleClickOpen(value, "delete")}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    selectableRows: "none",
    filterType: "checkbox",
  };
  return (
    <>
      <Box sx={{ width: "100%" }} data-testid="actorContent">
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer data-testid="actorTable">
            <MUIDataTable
              title={
                <Box>
                  <IconButton
                    data-testid="addButton"
                    onClick={() => {
                      setActor(actorState);
                      setOpen({ ...open, add: true });
                    }}
                  >
                    <Tooltip title="Add an actor">
                      <AddIcon
                        sx={{ color: "white", fontSize: { xs: 14, sm: 28 } }}
                      />
                    </Tooltip>
                  </IconButton>
                  Actors List
                </Box>
              }
              data={actors}
              columns={columns}
              options={options}
            />
          </TableContainer>
        </Paper>
      </Box>

      <AddEditActorModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        changeHandler={changeHandler}
        handleAddSubmit={handleAddSubmit}
        handleEditSubmit={handleEditSubmit}
        actor={actor}
      />
      <DeleteActorModal
        open={open}
        handleClose={handleClose}
        handleDeleteSubmit={handleDeleteSubmit}
      />
    </>
  );
};
