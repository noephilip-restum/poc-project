import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Button from "@mui/material/Button";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Movie } from "types/Movies";
import { Actor } from "types/Actor";
import { DialogTitleProps } from "types/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getMovies,
} from "store/slices/movie";
import { getActors } from "store/slices/actor";
import { showSuccessAlert, showErrorAlert } from "components/alert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IMovie {
  id: string;
  title: string;
  description: string;
  year_of_release: string;
  cost: number;
  actorIds: string[];
  image_link: string;
}
export const MovieTable = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const movies = useAppSelector((state) => state.movies.data as Movie[]);
  const actors = useAppSelector((state) => state.actors.data as Actor[]);
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<Dayjs | null>();
  const [movie, setMovie] = React.useState<IMovie>({
    id: "",
    title: "",
    description: "",
    year_of_release: "",
    cost: 0,
    actorIds: [],
    image_link: "",
  });
  const [trigger, setTrigger] = React.useState(false as Boolean);
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
    add: false,
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getActors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  const getStyles = (
    name: string,
    personName: readonly string[],
    theme: Theme
  ) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const getActorName = (id: string) => {
    let tempActor = actors.find((actor) => actor.id === id.toString());
    return `${tempActor?.firstName} ${tempActor?.lastName}`;
  };
  const handleClickOpen = async (value: Number, option: any) => {
    let tempMovie: any = movies.find((movie) => movie.id === value.toString());
    let tempActor: any = tempMovie.actors.map((actor: any) => {
      return actor.id;
    });
    setMovie({ ...tempMovie, actorIds: tempActor });
    setOpen({ ...open, [option]: true });
  };

  const handleClose = () => {
    setOpen({ delete: false, edit: false, add: false });
  };

  const handleEditSubmit = () => {
    dispatch(editMovie(movie))
      .unwrap()
      .then((res: any) => {
        console.log(res);
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
    dispatch(deleteMovie({ id: movie.id }))
      .unwrap()
      .then(() => {
        setTrigger(!trigger);
        handleClose();
        showSuccessAlert("Movie is deleted");
      })
      .catch((error) => showErrorAlert(error));
  };

  const handleAddSubmit = () => {
    dispatch(createMovie(movie))
      .unwrap()
      .then((res: any) => {
        console.log(res);
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

  const changeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let name = event.target.name;
    let value =
      name === "cost" ? parseInt(event.target.value) : event.target.value;

    setMovie({ ...movie, [name]: value });
  };

  const handleMultipleChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    setMovie({
      ...movie,
      actorIds: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setMovie({
      ...movie,
      year_of_release: dayjs(newValue).format("YYYY-MM-DD"),
    });
    setValue(newValue);
  };

  const columns = [
    {
      name: "image_link",
      label: "Image",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: String) => {
          return (
            <>
              <Avatar src={`${value}`} sx={{ width: 120, height: 120 }} />
            </>
          );
        },
      },
    },

    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
        // customBodyRender: (value: String, rowData: any) => {
        //   return `${value} ${rowData.tableData[0][1]}`;
        // },
      },
    },
    {
      name: "description",
      label: "Overview",
      options: {
        filter: true,
        sort: false,
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
              <Button onClick={() => handleClickOpen(value, "edit")}>
                Edit
              </Button>
              <Button onClick={() => handleClickOpen(value, "delete")}>
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
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <MUIDataTable
              title={
                <Box>
                  <IconButton onClick={() => setOpen({ ...open, add: true })}>
                    <Tooltip title="Add an actor">
                      <AddIcon
                        sx={{ color: "white", fontSize: { xs: 14, sm: 28 } }}
                      />
                    </Tooltip>
                  </IconButton>
                  Movies List
                </Box>
              }
              data={movies}
              columns={columns}
              options={options}
            />
          </TableContainer>
        </Paper>
      </Box>

      <Dialog
        open={open.delete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this User?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open.add || open.edit}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {open.add ? `Create Movie` : `Edit Movie`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  value={movie.title}
                  onChange={changeHandler}
                  required
                  fullWidth
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="cost"
                  value={movie.cost}
                  onChange={changeHandler}
                  required
                  fullWidth
                  label="Cost"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-helper-label">
                  Overview
                </InputLabel>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  value={movie.description}
                  onChange={(e) =>
                    setMovie({ ...movie, description: e.target.value })
                  }
                  style={{
                    minWidth: 535,
                    minHeight: 150,
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    color: "white",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 535 }}>
                  <InputLabel id="demo-multiple-chip-label">Actors</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={movie.actorIds}
                    onChange={handleMultipleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={getActorName(value)} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {actors.map((actor: any) => (
                      <MenuItem
                        key={actor.image_link}
                        value={actor.id}
                        style={getStyles(
                          `${actor.firstName} ${actor.lastName}`,
                          personName,
                          theme
                        )}
                      >
                        {actor.firstName} {actor.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="image_link"
                  label="Image Link"
                  type="text"
                  value={movie.image_link}
                  onChange={changeHandler}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={open.add ? handleAddSubmit : handleEditSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
