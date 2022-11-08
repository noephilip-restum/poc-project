import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VideoItemWithHover from "./VideoItemWithHover";
import ActorAvatar from "./ActorAvatar";
import { Movie } from "types/Movies";
import { Actor } from "types/Actor";
import { useLocation } from "react-router-dom";

interface GridWithInfiniteScrollProps {
  data: Movie[] | Actor[];
}
const GridWithInfiniteScroll = ({ data }: GridWithInfiniteScrollProps) => {
  const location = useLocation();
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
      <Typography variant="h5" sx={{ color: "text.primary", mb: 2 }}>
        {location.pathname === `/browse/movies` ? "All Movies" : "All Actors"}
      </Typography>

      <Grid container spacing={2}>
        {data.map((video: any) => (
          <Grid key={video.id} item xs={6} sm={3} md={2} sx={{ zIndex: 1 }}>
            {video.title ? (
              <VideoItemWithHover video={video} />
            ) : (
              <ActorAvatar actor={video} />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GridWithInfiniteScroll;
