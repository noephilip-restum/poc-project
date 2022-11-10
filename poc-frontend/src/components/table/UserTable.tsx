import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { User } from "types/User";
import { DialogTitleProps } from "types/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getUsers, editUser, signupUser, deleteUser } from "store/slices/user";
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

export const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data as User[]);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    account_role: "",
    account_status: "",
  });
  const [trigger, setTrigger] = React.useState(false as boolean);
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
    add: false,
  });

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  const handleClickOpen = async (value: number, option: any) => {
    let tempUser: any = users.find((user) => user._id === value.toString());
    setCurrentUser(tempUser);
    setOpen({ ...open, [option]: true });
  };

  const handleClose = () => {
    setOpen({ delete: false, edit: false, add: false });
  };

  const handleEditSubmit = () => {
    dispatch(editUser(currentUser))
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
    dispatch(deleteUser({ id: currentUser._id }))
      .unwrap()
      .then(() => {
        setTrigger(!trigger);
        handleClose();
        showSuccessAlert("User is deleted");
      })
      .catch((error) => showErrorAlert(error));
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  };

  const getUserFullName = (id: string) => {
    let user = users.find((user) => user._id === id);
    return user && `${user?.firstName} ${user?.lastName}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user: any = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      account_role: data.get("account_role"),
      account_status: data.get("account_status"),
    };

    dispatch(signupUser(user))
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

  const columns = [
    {
      name: "_id",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return getUserFullName(value);
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "account_status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return (
            <>
              {value === "pending" ? (
                <Chip label={value.toUpperCase()} color="primary" />
              ) : (
                <Chip label={value.toUpperCase()} color="success" />
              )}
            </>
          );
        },
      },
    },
    {
      name: "account_role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return (
            <>
              <Chip label={value.toUpperCase()} />
            </>
          );
        },
      },
    },

    {
      name: "_id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: number, dataIndex: any) => {
          return (
            <>
              {users[dataIndex.rowIndex].account_role !== "root" ? (
                <>
                  <Button onClick={() => handleClickOpen(value, "edit")}>
                    Edit
                  </Button>
                  <Button onClick={() => handleClickOpen(value, "delete")}>
                    Delete
                  </Button>
                </>
              ) : null}
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
                  Users List
                </Box>
              }
              data={users}
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
          {open.add ? `Create User` : `Edit User`}
        </BootstrapDialogTitle>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={currentUser.firstName}
                  onChange={changeHandler}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={changeHandler}
                  value={currentUser.lastName}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={changeHandler}
                  value={currentUser.email}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: 260 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Account Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Account Status"
                    name="account_status"
                    onChange={handleChange}
                    value={currentUser.account_status}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: 260 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Account Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-helper-label"
                    id="demo-simple-helper"
                    label="Account Role"
                    name="account_role"
                    onChange={handleChange}
                    value={currentUser.account_role}
                  >
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {open.add && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            {open.add ? (
              <Button autoFocus type="submit">
                Add User
              </Button>
            ) : (
              <Button autoFocus onClick={handleEditSubmit}>
                Save changes
              </Button>
            )}
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
};
