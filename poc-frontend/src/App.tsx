import Box from "@mui/material/Box";
import MainRoutes from "routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <MainRoutes />
      <ToastContainer theme="dark" />
    </Box>
  );
};

export default App;
