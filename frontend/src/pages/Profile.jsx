import { useState, useEffect } from "react";
import api from "../api";
import Footer from "../components/Footer";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
  Divider,
} from "@mui/material";

import {
  Person as PersonIcon,
  Email as EmailIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile({ mode, toggleTheme })  {

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "User";

  const email =
    localStorage.getItem("email") || "Not Available";

  const [totalScans, setTotalScans] = useState(0);

  const [safeUrls, setSafeUrls] = useState(0);

  const [phishingUrls, setPhishingUrls] = useState(0);

  useEffect(() => {

    const loadStats = async () => {

      try {

        const res = await api.get("/history/");

        const history = Array.isArray(res.data)
          ? res.data
          : [];

        setTotalScans(history.length);

        setSafeUrls(
          history.filter(
            (item) => item.prediction === "Safe"
          ).length
        );

        setPhishingUrls(
          history.filter(
            (item) => item.prediction === "Phishing"
          ).length
        );

      } catch (err) {

        console.error(err);

      }

    };

    loadStats();

  }, []);

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (
  <>
    <Navbar
  mode={mode}
  toggleTheme={toggleTheme}
/>

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#E3F2FD,#F5F9FF)",
        py: 5,
      }}
    >
      <Container maxWidth="md">

        <Paper
          elevation={10}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >

          {/* Header */}

          <Box
            sx={{
              background:
                "linear-gradient(135deg,#1565C0,#42A5F5)",
              color: "white",
              textAlign: "center",
              py: 5,
            }}
          >

            <Avatar
              sx={{
                width: 140,
                height: 140,
                bgcolor: "white",
                color: "#1565C0",
                mx: "auto",
                mb: 2,
                boxShadow: 6,
              }}
            >
              <PersonIcon sx={{ fontSize: 80 }} />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {username}
            </Typography>

            <Typography sx={{ opacity: .9 }}>
              AI Powered Phishing Detection User
            </Typography>

          </Box>

          <Box sx={{ p: 4 }}>

            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Profile Information
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >

                <PersonIcon
                  color="primary"
                  sx={{
                    mr: 2,
                    fontSize: 35,
                  }}
                />

                <Box>

                  <Typography
                    variant="caption"
                    color="gray"
                  >
                    Username
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {username}
                  </Typography>

                </Box>

              </Box>

            </Paper>

            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >

                <EmailIcon
                  color="primary"
                  sx={{
                    mr: 2,
                    fontSize: 35,
                  }}
                />

                <Box>

                  <Typography
                    variant="caption"
                    color="gray"
                  >
                    Email Address
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {email}
                  </Typography>

                </Box>

              </Box>

            </Paper>

            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              Statistics
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                          <Grid size={{ xs: 12, md: 4 }}>

                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >

                  <Typography
                    color="text.secondary"
                  >
                    Total Scans
                  </Typography>

                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight="bold"
                  >
                    {totalScans}
                  </Typography>

                </Paper>

              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >

                  <Typography
                    color="text.secondary"
                  >
                    Safe URLs
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      color: "#2E7D32",
                      fontWeight: "bold",
                    }}
                  >
                    {safeUrls}
                  </Typography>

                </Paper>

              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >

                  <Typography
                    color="text.secondary"
                  >
                    Phishing URLs
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      color: "#C62828",
                      fontWeight: "bold",
                    }}
                  >
                    {phishingUrls}
                  </Typography>

                </Paper>

              </Grid>

            </Grid>

            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              sx={{
                mt: 5,
                py: 1.8,
                borderRadius: 3,
                fontSize: 18,
                fontWeight: "bold",
              }}
              onClick={logout}
            >
              Logout
            </Button>

          </Box>

        </Paper>

      </Container>

    </Box>
<Footer />
  </>
);
}

export default Profile;
