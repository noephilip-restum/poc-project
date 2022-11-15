import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import GradingIcon from "@mui/icons-material/Grading";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteCookie } from "utils/main";
import {
  UserTable,
  ActorTable,
  MovieTable,
  ReviewTable,
} from "components/table";

const drawerWidth = 210;

const ClippedDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Admin Page
          </Typography>
          <Box
            sx={{ flexGrow: 0, display: "flex", gap: 2 }}
            data-testid="avatar"
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="avatar-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  deleteCookie("token");
                  navigate("/login");
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box data-testid="sideNav" sx={{ overflow: "auto", width: "200px" }}>
          <List>
            <ListItem disablePadding onClick={() => navigate("/admin/users")}>
              <ListItemButton>
                <ListItemIcon>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText primary={"Users"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => navigate("/admin/reviews")}>
              <ListItemButton>
                <ListItemIcon>
                  <GradingIcon />
                </ListItemIcon>
                <ListItemText primary={"Reviews"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => navigate("/admin/movies")}>
              <ListItemButton>
                <ListItemIcon>
                  <LiveTvIcon />
                </ListItemIcon>
                <ListItemText primary={"Movies"} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding onClick={() => navigate("/admin/actors")}>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Actors"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box data-testid="tables" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
          <Link underline="hover" color="inherit">
            {location.pathname.toUpperCase()}
          </Link>
        </Breadcrumbs>
        {location.pathname === "/admin/users" && <UserTable />}
        {location.pathname === "/admin/actors" && <ActorTable />}
        {location.pathname === "/admin/movies" && <MovieTable />}
        {location.pathname === "/admin/reviews" && <ReviewTable />}
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
