import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

import { Review } from "types/Review";
import { Movie } from "types/Movies";
import { User } from "types/User";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getUsers } from "store/slices/user";
import {
  createReview,
  deleteReview,
  editReview,
  getReview,
} from "store/slices/review";
import { getMovies } from "store/slices/movie";
import { showSuccessAlert, showErrorAlert } from "components/alert";
import {
  AddEditReviewModal,
  DeleteReviewModal,
} from "components/modal/ReviewModals";

interface IReview {
  id: string;
  message: string;
  rating: number | null;
  review_status: boolean;
  movieId: string;
  usersId: "";
}

export const ReviewTable = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.data as Review[]);
  const movies = useAppSelector((state) => state.movies.data as Movie[]);
  const users = useAppSelector((state) => state.users.data as User[]);
  const [review, setReview] = React.useState<IReview>({
    id: "",
    message: "",
    rating: 0,
    review_status: true,
    movieId: "",
    usersId: "",
  });
  const [trigger, setTrigger] = React.useState(false as Boolean);
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
    add: false,
  });

  useEffect(() => {
    dispatch(getReview());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getUsers());
  }, [dispatch]);

  const handleClickOpen = async (value: Number, option: any) => {
    let tempReview: any = reviews.find(
      (review) => review.id === value.toString()
    );
    setReview(tempReview);
    setOpen({ ...open, [option]: true });
  };

  const handleClose = () => {
    setOpen({ delete: false, edit: false, add: false });
  };

  const handleEditSubmit = () => {
    dispatch(editReview(review))
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
    dispatch(deleteReview({ id: review.id }))
      .unwrap()
      .then(() => {
        setTrigger(!trigger);
        handleClose();
        showSuccessAlert("Review is deleted");
      })
      .catch((error) => showErrorAlert(error));
  };

  const handleAddSubmit = () => {
    const userJson = localStorage.getItem("loggedIn");
    let user = userJson !== null ? JSON.parse(userJson) : {};
    let tempReview = {
      ...review,
      usersId: user._id,
    };
    dispatch(createReview(tempReview))
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

  const handleChange = (event: SelectChangeEvent) => {
    setReview({
      ...review,
      review_status: event.target.value === "True" ? true : false,
    });
  };

  const getUserName = (id: string) => {
    let tempUser = users.find((user) => user._id === id);

    return `${tempUser?.firstName} ${tempUser?.lastName}`;
  };

  const columns = [
    {
      name: "usersId",
      label: "Reviewer",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return getUserName(value);
        },
      },
    },
    {
      name: "message",
      label: "Message",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: number) => {
          return (
            <>
              <Rating value={value} readOnly />
            </>
          );
        },
      },
    },
    {
      name: "review_status",
      label: "Review Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: String) => {
          return <Chip label={value ? "True" : "False"} />;
        },
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
                    <Tooltip title="Add Review">
                      <AddIcon
                        sx={{ color: "white", fontSize: { xs: 14, sm: 28 } }}
                      />
                    </Tooltip>
                  </IconButton>
                  Reviews List
                </Box>
              }
              data={reviews}
              columns={columns}
              options={options}
            />
          </TableContainer>
        </Paper>
      </Box>

      <AddEditReviewModal
        handleAddSubmit={handleAddSubmit}
        handleEditSubmit={handleEditSubmit}
        handleClose={handleClose}
        open={open}
        setReview={setReview}
        review={review}
        handleChange={handleChange}
        movies={movies}
      />

      <DeleteReviewModal
        open={open}
        handleClose={handleClose}
        handleDeleteSubmit={handleDeleteSubmit}
      />
    </>
  );
};
