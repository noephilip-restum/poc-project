import { useEffect } from "react";

import GridPage from "components/GridPage";
import { Movie } from "types/Movies";
import { getMovies } from "store/slices/movie";
import { useAppDispatch, useAppSelector } from "hooks/redux";

const MovieExplore = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.data as Movie[]);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <>
      <GridPage data={movies} />
    </>
  );
};

export default MovieExplore;
