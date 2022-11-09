import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { BootstrapDialogTitle, BootstrapDialog } from "./common";

export const AddEditReviewModal = ({
  handleAddSubmit,
  handleEditSubmit,
  handleClose,
  open,
  setReview,
  review,
  handleChange,
  movies,
}: any) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open.add || open.edit}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {open.add ? `Create Review` : `Edit Review`}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">
                Message
              </InputLabel>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                value={review.message}
                onChange={(e) =>
                  setReview({ ...review, message: e.target.value })
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
            <Grid item xs={12} sm={6}>
              <Box>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ marginTop: "-5px", marginBottom: "5px" }}
                >
                  Rating
                </InputLabel>
                <Rating
                  value={review.rating}
                  onChange={(event, newValue) => {
                    setReview({ ...review, rating: newValue });
                  }}
                  name="rating"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Review Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Review Status"
                  name="review_status"
                  onChange={handleChange}
                  value={review.review_status ? "True" : "False"}
                >
                  <MenuItem value={"True"}>Approved</MenuItem>
                  <MenuItem value={"False"}>For Review</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {open.add && (
              <Grid item xs={12} sm={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  Movie
                </InputLabel>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={movies}
                  getOptionLabel={(movie: any) => movie.title}
                  onChange={(event, newValue) => {
                    //@ts-ignore: Object is possibly 'null'.
                    newValue && setReview({ ...review, movieId: newValue.id });
                  }}
                  sx={{ width: 550 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            )}
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

export const DeleteReviewModal = ({
  open,
  handleClose,
  handleDeleteSubmit,
}: any) => {
  return (
    <Dialog
      open={open.delete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{"Delete this Review?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleDeleteSubmit} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
