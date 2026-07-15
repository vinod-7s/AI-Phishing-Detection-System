import {
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign="center">

        <ErrorIcon
          sx={{
            fontSize: 120,
            color: "#1565C0",
          }}
        />

        <Typography
          variant="h1"
          fontWeight="bold"
        >
          404
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
        >
          Page Not Found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          The page you are looking for does not exist.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>

      </Box>
    </Container>
  );
}

export default NotFound;