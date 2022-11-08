import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VideoItemWithHover from "./VideoItemWithHover";
import { Movie } from "types/Movies";
interface GridWithInfiniteScrollProps {
  movies: Movie[];
}
const GridWithInfiniteScroll = ({ movies }: GridWithInfiniteScrollProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: "30px", sm: "60px" },
        pb: 4,
        pt: "150px",
        bgcolor: "inherit",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "text.primary", mb: 2 }}
      >{`All Movies`}</Typography>

      <Grid container spacing={2}>
        {movies.map((video: any) => (
          <Grid key={video.id} item xs={6} sm={3} md={2} sx={{ zIndex: 1 }}>
            <VideoItemWithHover video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GridWithInfiniteScroll;
