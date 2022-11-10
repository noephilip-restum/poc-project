import Button, { ButtonProps } from "@mui/material/Button";
import StarRateIcon from "@mui/icons-material/StarRate";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React from "react";
import Grid from "@mui/material/Grid/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import { BootstrapDialogTitle, BootstrapDialog } from "./modal/common";
import { createReview } from "store/slices/review";
import { useAppDispatch } from "hooks/redux";
import { showInfoAlert, showErrorAlert } from "components/alert";
import { Review } from "types/Review";

interface IReview {
  id: string;
  message: string;
  rating: number | null;
  review_status: boolean;
  movieId: string;
  usersId: "";
}

const reviewState: IReview = {
  id: "",
  message: "",
  rating: 0,
  review_status: true,
  movieId: "",
  usersId: "",
};

const RateButton = ({ movie, sx, ...others }: ButtonProps | any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState({
    add: false,
  });
  const [review, setReview] = React.useState<IReview>(reviewState);

  const handleClose = () => {
    setOpen({ add: false });
  };

  const handleAddSubmit = () => {
    const userJson = localStorage.getItem("loggedIn");
    let user = userJson !== null ? JSON.parse(userJson) : {};

    let checkUser = movie.reviews?.find(
      (data: Review) => data.usersId === user._id
    );

    if (!checkUser) {
      let tempReview: any = {
        ...review,
        movieId: movie?.id?.toString(),
        usersId: user._id,
      };

      dispatch(createReview(tempReview))
        .unwrap()
        .then((res: any) => {
          if (!res.status) {
            showErrorAlert(res.message);
          } else {
            handleClose();
            showInfoAlert("Review is now for review");
          }
        })
        .catch((error) => showErrorAlert(error));
    } else {
      showInfoAlert("You already added a review for this movie");
    }
  };

  return (
    <>
      <Button
        color="inherit"
        variant="contained"
        onClick={() => {
          setReview(reviewState);
          setOpen({ add: true });
        }}
        startIcon={
          <StarRateIcon
            sx={{
              fontSize: {
                xs: "24px !important",
                sm: "32px !important",
                md: "40px !important",
              },
            }}
          />
        }
        {...others}
        sx={{
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          fontSize: { xs: 18, sm: 24, md: 28 },
          lineHeight: 1.5,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          textTransform: "capitalize",
          ...sx,
        }}
      >
        Rate
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open.add}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {"Create Review"}
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
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddSubmit}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default RateButton;
