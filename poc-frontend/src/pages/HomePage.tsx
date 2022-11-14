import Stack from "@mui/material/Stack";
import MovieBanner from "components/MovieBanner";
import SliderRowForGenre from "components/VideoSlider";

const HomePage = () => {
  return (
    <Stack spacing={2} sx={{ bgcolor: "background.default" }}>
      <MovieBanner />
      <SliderRowForGenre />
    </Stack>
  );
};

export default HomePage;
