import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux";
import { loginUser } from "store/slices/user";
import { showErrorAlert, showInfoAlert } from "components/alert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let user: any = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (!user.email || !user.password) {
      showInfoAlert("Please leave no empty fields to proceed");
    } else {
      dispatch(loginUser(user))
        .unwrap()
        .then((res: any) => {
          localStorage.setItem("loggedIn", JSON.stringify(res.userProfile));
          if (
            res.userProfile.account_role.toLocaleLowerCase() === "admin" ||
            res.userProfile.account_role.toLocaleLowerCase() === "root"
          ) {
            navigate("/admin/users");
          } else {
            if (
              res.userProfile.account_status.toLocaleLowerCase() === "pending"
            ) {
              showInfoAlert("Account is pending");
            } else if (
              res.userProfile.account_status.toLocaleLowerCase() === "reject"
            ) {
              showErrorAlert("Account is disable");
            } else {
              navigate("/browse");
            }
          }
        })
        .catch((error) => showErrorAlert("Invalid Email or Password"));
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh" }}
      data-testid="login"
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" sx={{ color: "text.primary" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
