import {
  Box,
  Typography,
  Divider,
} from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        py: 3,
        textAlign: "center",
        background: "#0F172A",
        color: "white",
      }}
    >
      <Divider sx={{ mb: 2, bgcolor: "#555" }} />

      <Typography variant="h6">
        🛡 AI Powered Phishing Detection System
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Final Year Project | Computer Science & Engineering
      </Typography>

      <Typography variant="body2">
        Developed by Vinod
      </Typography>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 2,
          color: "#ccc",
        }}
      >
        © 2026 All Rights Reserved
      </Typography>
    </Box>
  );
}

export default Footer;