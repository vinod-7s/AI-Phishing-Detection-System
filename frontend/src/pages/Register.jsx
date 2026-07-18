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
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  PersonAdd,
} from "@mui/icons-material";

import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const register = async () => {
    if (!form.username || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", form);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.detail || "Registration Failed"
      );
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
            <PersonAdd
              sx={{
                fontSize: 70,
                color: "#1565C0",
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Create Account
            </Typography>

            <Typography color="gray">
              Register to Continue
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
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
            label="Password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
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
                      setShowPassword(!showPassword)
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
            onClick={register}
          >
            {loading ? (
              <CircularProgress
                size={25}
                color="inherit"
              />
            ) : (
              "REGISTER"
            )}
          </Button>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Already have an account?
          </Typography>

          <Button
            component={Link}
            to="/login"
            fullWidth
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;