import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useLocation } from "react-router-dom";
import { getSearchMovies, getMovies } from "store/slices/movie";
import { getSearchActors, getActors } from "store/slices/actor";
import { useAppDispatch } from "hooks/redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBox = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (search !== "") {
      location.pathname === `/browse/movies`
        ? dispatch(getSearchMovies({ name: search }))
        : dispatch(getSearchActors({ name: search }));
    } else {
      location.pathname === `/browse/movies`
        ? dispatch(getMovies())
        : dispatch(getActors());
    }
  }, [dispatch, search, location.pathname]);

  return (
    <Search>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        style={{
          width: "500px",
          padding: "2px 5px 5px",
        }}
        onChange={(e) => setSearch(e?.target.value)}
      />
    </Search>
  );
};

export default SearchBox;
