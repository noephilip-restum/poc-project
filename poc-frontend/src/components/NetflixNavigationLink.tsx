import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Link, { LinkProps } from "@mui/material/Link";

const NetflixNavigationLink = ({
  sx,
  children,
  ...others
}: LinkProps & RouterLinkProps) => {
  return (
    <Link
      {...others}
      component={RouterLink}
      sx={{ color: "text.primary", textDecoration: "none", ...sx }}
    >
      {children}
    </Link>
  );
};

export default NetflixNavigationLink;
