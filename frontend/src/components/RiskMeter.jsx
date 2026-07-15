import { Gauge } from "@mui/x-charts/Gauge";
import { Box, Typography } from "@mui/material";

function RiskMeter({ confidence, prediction }) {
  const value = Number((confidence * 100).toFixed(2));

  let color = "#2E7D32";
  let risk = "LOW RISK";

  if (value >= 70) {
    color = "#C62828";
    risk = "HIGH RISK";
  } else if (value >= 40) {
    color = "#F9A825";
    risk = "MEDIUM RISK";
  }

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        AI Risk Meter
      </Typography>

      <Gauge
        width={260}
        height={260}
        value={value}
        startAngle={-110}
        endAngle={110}
        text={`${value}%`}
        sx={{
          "& .MuiGauge-valueArc": {
            fill: color,
          },

          "& .MuiGauge-referenceArc": {
            fill: "#E0E0E0",
          },

          "& .MuiGauge-valueText": {
            fontSize: 28,
            fontWeight: "bold",
          },
        }}
      />

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mt: 2,
          color,
        }}
      >
        {prediction === "Safe"
          ? "🟢 LOW RISK"
          : prediction === "Phishing"
          ? "🔴 HIGH RISK"
          : risk}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        AI Confidence: {value}%
      </Typography>
    </Box>
  );
}

export default RiskMeter;