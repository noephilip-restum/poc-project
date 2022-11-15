import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DialogContent from "@mui/material/DialogContent";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import { BootstrapDialogTitle, BootstrapDialog } from "./common";

export const AddEditActorModal = ({
  open,
  handleClose,
  actor,
  changeHandler,
  handleChange,
  handleAddSubmit,
  handleEditSubmit,
}: any) => {
  return (
    <BootstrapDialog
      data-testid="addEditDialog"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open.add || open.edit}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {open.add ? `Create an Actor` : `Edit an Actor`}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={actor.firstName}
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
                value={actor.lastName}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ minWidth: 268 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Account Status"
                  name="account_status"
                  onChange={handleChange}
                  value={actor.gender.toString()}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Age"
                name="age"
                type="number"
                onChange={changeHandler}
                value={actor.age}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="image_link"
                label="Image Link"
                type="text"
                value={actor.image_link}
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
  );
};

export const DeleteActorModal = ({
  open,
  handleClose,
  handleDeleteSubmit,
}: any) => {
  return (
    <Dialog
      data-testid="deleteDialog"
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
  );
};
