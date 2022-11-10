import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Movie } from "types/Movies";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getMovies } from "store/slices/movie";
import { getRandomNumber } from "utils/common";
import MaxLineTypography from "./MaxLineTypography";
import RateButton from "./RateButton";
import MoreInfoButton from "./MoreInfoButton";

import { useDetailModal } from "providers/DetailModalProvider";

interface IMovie {
  id: string;
  title: string;
  description: string;
  year_of_release: string;
  cost: number;
  image_link: string;
}

const MovieBanner = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.data as Movie[]);
  const [movie, setMovie] = useState<IMovie>({
    id: "",
    title: "",
    description: "",
    year_of_release: "",
    cost: 0,
    image_link: "",
  });

  const { setMovieId } = useDetailModal();

  useEffect(() => {
    dispatch(getMovies());
    setMovieId(null);
  }, [dispatch, setMovieId]);

  const getRandomMovie = () => {
    let randomMovie = movies[getRandomNumber(movies.length)];
    randomMovie && setMovie(randomMovie);
  };

  !movie.id && getRandomMovie();

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          position: "relative",
          pb: "40%",
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            height: "56.25vw",
          }}
        >
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
            }}
          >
            <Box
              component="img"
              src={movie?.image_link}
              sx={{
                width: "100%",

                objectFit: "cover",
                position: "absolute",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50%",
              }}
            />

            <Box
              sx={{
                background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                top: 0,
                left: 0,
                bottom: 0,
                right: "26.09%",
                opacity: 1,
                position: "absolute",
                transition: "opacity .5s",
              }}
            />
            <Box
              sx={{
                backgroundColor: "transparent",
                backgroundImage:
                  "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0px top",
                backgroundSize: "100% 100%",
                bottom: 0,
                position: "absolute",
                height: "14.7vw",
                opacity: 1,
                top: "auto",
                width: "100%",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Stack
              spacing={4}
              sx={{
                bottom: "35%",
                position: "absolute",
                left: { xs: "4%", md: "60px" },
                top: 0,
                width: "36%",
                zIndex: 10,
                justifyContent: "flex-end",
              }}
            >
              <MaxLineTypography variant="h2" maxLine={1} color="text.primary">
                {movie.title}
              </MaxLineTypography>
              <MaxLineTypography variant="h5" maxLine={3} color="text.primary">
                {movie.description}
              </MaxLineTypography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {localStorage.getItem("loggedIn") && (
                  <RateButton size="large" movie={movie} />
                )}
                <MoreInfoButton
                  size="large"
                  onClick={() => {
                    setMovieId(movie.id);
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieBanner;
