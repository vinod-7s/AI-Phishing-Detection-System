import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Shield,
} from "@mui/icons-material";

import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", res.data.username);

      toast.success("Login Successful");

      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Invalid Email or Password");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#1565C0,#42A5F5)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Shield
              sx={{
                fontSize: 70,
                color: "#1565C0",
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              AI Phishing Detection
            </Typography>

            <Typography color="gray">
              Login to Continue
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type={
              showPassword ? "text" : "password"
            }
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              height: 50,
            }}
            onClick={login}
          >
            {loading ? (
              <CircularProgress
                size={25}
                color="inherit"
              />
            ) : (
              "LOGIN"
            )}
          </Button>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Don't have an account?
          </Typography>

          <Button
            component={Link}
            to="/register"
            fullWidth
          >
            Register
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;