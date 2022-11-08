import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usePortal } from "providers/PortalProvider";
import { useDetailModal } from "providers/DetailModalProvider";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import QualityChip from "./QualityChip";

interface VideoCardModalProps {
  video: any;
  anchorElement: HTMLElement;
}

const VideoCardModal = ({ video, anchorElement }: VideoCardModalProps) => {
  const { setPortal } = usePortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setMovieId } = useDetailModal();

  const getRatingAverage = () => {
    let sum = 0;

    video?.reviews
      ?.filter((review: any) => review.review_status === true) // eslint-disable-next-line
      .map((review: any) => {
        sum += review.rating;
      });

    return sum / video?.reviews?.length;
  };

  return (
    <Card
      onMouseLeave={() => {
        setPortal(null, null);
      }}
      sx={{
        width: rect.width * 1.5,
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <Box
          component="img"
          src={video.image_link}
          sx={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            backgroundPosition: "50%",
          }}
        />
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            px: 2,
            pb: 0.5,
          }}
        >
          <MaxLineTypography
            maxLine={2}
            sx={{ width: "80%", fontWeight: 700 }}
            variant="h6"
          >
            {video.title}
          </MaxLineTypography>
        </Stack>
      </Box>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Rating
              name="simple-controlled"
              value={getRatingAverage()}
              readOnly
            />
            <Box flexGrow={1} />
            <NetflixIconButton
              size="large"
              onClick={() => {
                setMovieId(video.id);
              }}
            >
              <ExpandMoreIcon />
            </NetflixIconButton>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">{video.year_of_release}</Typography>
            <QualityChip label="HD" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCardModal;
