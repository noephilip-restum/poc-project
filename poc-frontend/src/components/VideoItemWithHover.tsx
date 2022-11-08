import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Movie } from "types/Movies";

import { usePortal } from "providers/PortalProvider";

const PaperStyle = styled(Paper)(() => ({
  zIndex: 9,
  cursor: "pointer",
  borderRadius: "4px",
  position: "relative",
}));

interface VideoItemWithHoverProps {
  video: Movie;
}

const VideoItemWithHover = ({ video }: VideoItemWithHoverProps) => {
  const { setPortal, anchorElement } = usePortal();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPortal(event.currentTarget, video);
  };

  const open = Boolean(anchorElement);

  return (
    <>
      <PaperStyle
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
      >
        <Box
          component="img"
          src={video.image_link}
          sx={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            borderRadius: "4px",
          }}
        />
      </PaperStyle>
    </>
  );
};

export default VideoItemWithHover;
