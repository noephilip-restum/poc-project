import { useEffect } from "react";
import Stack from "@mui/material/Stack";

import MovieBanner from "components/MovieBanner";
import SliderRowForGenre from "components/VideoSlider";
import { useDetailModal } from "providers/DetailModalProvider";

const HomePage = () => {
  const { onClose } = useDetailModal();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line
  }, []);

  return (
    <Stack spacing={2} sx={{ bgcolor: "background.default" }}>
      <MovieBanner />
      <SliderRowForGenre />
    </Stack>
  );
};

export default HomePage;
