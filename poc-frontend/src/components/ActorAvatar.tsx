import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const ActorAvatar = ({ actor }: any) => {
  return (
    <>
      <Tooltip title={`${actor.firstName} ${actor.lastName}`} key={actor.id}>
        <Avatar
          alt={`${actor.firstName} ${actor.lastName}`}
          src={`${actor.image_link}`}
          sx={{
            height: "200px",
            width: "200px",
          }}
        />
      </Tooltip>
    </>
  );
};
export default ActorAvatar;
