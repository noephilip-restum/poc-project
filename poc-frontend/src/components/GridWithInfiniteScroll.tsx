import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VideoItemWithHover from "./VideoItemWithHover";
import { Movie } from "types/Movies";
import { Actor } from "types/Actor";
import { useLocation } from "react-router-dom";
import ActorCard from "./ActorCard";

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
      {data.length !== 0 && (
        <Typography
          variant="h5"
          sx={{ color: "text.primary", mb: 2 }}
          data-testid="title"
        >
          {location.pathname === `/browse/movies` ? "All Movies" : "All Actors"}
        </Typography>
      )}

      <Grid container spacing={2} data-testid="list">
        {data.length !== 0 ? (
          data.map((video: any) => (
            <Grid key={video.id} item xs={6} sm={3} md={2} sx={{ zIndex: 1 }}>
              {video.title ? (
                <VideoItemWithHover video={video} />
              ) : (
                <ActorCard actor={video} />
              )}
            </Grid>
          ))
        ) : (
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              mb: 2,
              justifyContent: "center",
              textAlign: "center",
              marginTop: "8%",
              marginLeft: "40%",
            }}
          >
            No Results Found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default GridWithInfiniteScroll;
