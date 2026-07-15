import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import {
  Dashboard,
  History,
  Logout,
  Shield,
  Person,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "User";

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      path: "/",
    },
    {
      text: "History",
      path: "/history",
    },
    {
      text: "Profile",
      path: "/profile",
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={5}
        sx={{
          background:
            "linear-gradient(90deg,#1565C0,#42A5F5)",
        }}
      >
        <Toolbar>

          <Shield sx={{ mr: 1 }} />

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
            }}
          >
            AI Phishing Detection
          </Typography>

          {/* Desktop Menu */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 1,
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<Dashboard />}
            >
              Dashboard
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/history"
              startIcon={<History />}
            >
              History
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/profile"
              startIcon={<Person />}
            >
              Profile
            </Button>

            <IconButton
              color="inherit"
              onClick={(e) =>
                setAnchorEl(e.currentTarget)
              }
            >
              <Avatar>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>

          {/* Mobile Menu */}

          <IconButton
            color="inherit"
            sx={{
              display: {
                md: "none",
              },
            }}
            onClick={() =>
              setDrawerOpen(true)
            }
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* User Menu */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() =>
          setAnchorEl(null)
        }
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>

        <MenuItem
          onClick={logout}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() =>
                    setDrawerOpen(false)
                  }
                >
                  <ListItemText
                    primary={item.text}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding>
              <ListItemButton
                onClick={logout}
              >
                <ListItemText
                  primary="Logout"
                />
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;