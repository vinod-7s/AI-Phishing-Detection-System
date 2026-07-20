
import DownloadReport from "../components/DownloadReport";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import AnalyticsChart from "../components/AnalyticsChart";
import RiskMeter from "../components/RiskMeter";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useEffect } from "react";
import api from "../api";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import StatsChart from "../components/StatsChart";
import { toast } from "react-toastify";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  CircularProgress,
  LinearProgress,
  Chip,
} from "@mui/material";

import {
  Security,
  Language,
  CheckCircle,
  Warning,
} from "@mui/icons-material";

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

function Home({ mode, toggleTheme }) {
  const username = localStorage.getItem("username") || "User";

  const [url, setUrl] = useState("");
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalScans, setTotalScans] = useState(0);
  const [safeUrls, setSafeUrls] = useState(0);
  const [phishingUrls, setPhishingUrls] = useState(0);
  const [recentHistory, setRecentHistory] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [todayScans, setTodayScans] = useState(0);
  const [highConfidence, setHighConfidence] = useState(0);
  const [latestPrediction, setLatestPrediction] = useState("-");
  const [lastScanTime, setLastScanTime] = useState("-");
  const [pageLoading, setPageLoading] = useState(true);
  const loadStats = async () => {
    try {
      const res = await api.get("/history/");
      const history = res.data;

      setRecentHistory(history.slice(0, 5));
      setTotalScans(history.length);

      const safeCount = history.filter((item) => item.prediction === "Safe").length;
      setSafeUrls(safeCount);

      const phishingCount = history.filter((item) => item.prediction === "Phishing").length;
      setPhishingUrls(phishingCount);

      const accuracyValue = history.length === 0 ? 0 : ((safeCount / history.length) * 100).toFixed(1);
      setAccuracy(accuracyValue);

      const today = new Date().toDateString();
      const todayHistory = history.filter(
        (item) => item.created_at && new Date(item.created_at).toDateString() === today
      );
      setTodayScans(todayHistory.length);

      if (history.length > 0) {
        const latest = history[0];
        setLatestPrediction(latest.prediction);
        setLastScanTime(latest.created_at ? new Date(latest.created_at).toLocaleString() : "-");

        const highest = Math.max(
  ...history.map((item) => item.confidence || 0)
);
        setHighConfidence((highest * 100).toFixed(2));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const predict = async () => {
  if (!url.trim()) {
    toast.warning("Please enter a website URL");
    return;
  }

  setLoading(true);

  try {
    const res = await api.post("/predict/", {
      url,
    });
    console.log("Prediction Response:", res.data);

    setResult(res.data);

    toast.success("Prediction Completed Successfully");

    setUrl("");

    // Refresh dashboard/history
    await loadStats();

  } catch (err) {
    console.error("Prediction Error:", err);

    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Data:", err.response.data);
    }

    toast.error("Prediction Failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <>
     <Navbar
  mode={mode}
  toggleTheme={toggleTheme}
/>

      <Container
    id="full-report"
    maxWidth="xl"
    sx={{ mt: 4, mb: 4 }}
>
        {/* Header */}
        <MotionPaper
           
    
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          elevation={4}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg,#1565C0,#42A5F5)",
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 20% 50%, rgba(184, 101, 18, 0.1), transparent 50%)",
              animation: "shimmer 3s infinite",
            },
            "@keyframes shimmer": {
              "0%": { transform: "translateX(-100%)" },
              "100%": { transform: "translateX(100%)" },
            },
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ position: "relative", zIndex: 1 }}>
            🛡 AI Powered Phishing Detection System
          </Typography>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h6" sx={{ mt: 2, position: "relative", zIndex: 1 }}>
              Welcome, {username} 👋
            </Typography>
            <Typography sx={{ position: "relative", zIndex: 1 }}>
              Protect yourself from phishing websites using Artificial Intelligence.
            </Typography>
          </motion.div>
        </MotionPaper>
       
{result && (
  <DownloadReport
    result={result}
  />
)}
        {/* Website Scanner - RIGHT AFTER HEADER */}
        <MotionPaper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          elevation={4}
          sx={{ mt: 5, p: 4, borderRadius: 4, background: "linear-gradient(135deg, #4b1776, #0f934c)" }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "white", mb: 3 }}>
            🌐 Website Scanner
          </Typography>

          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TextField
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Language />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s",
                  backgroundColor: "white",
                  "&:focus-within": {
                    boxShadow: "0 0 0 3px rgba(21, 101, 192, 0.1)",
                  },
                },
              }}
            />
          </motion.div>

          <MotionButton
            component={motion.button}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(144, 21, 192, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            variant="contained"
            fullWidth
            sx={{ mt: 3, height: 55, fontSize: 18, fontWeight: "bold", background: "linear-gradient(135deg, #FF6B35, #FF8C42)" }}
            onClick={predict}
            disabled={loading}
            startIcon={<Security />}
          >
            {loading ? <CircularProgress size={25} color="inherit" /> : "🔍 Predict URL"}
          </MotionButton>
        </MotionPaper>
{result && <DownloadReport result={result} />}
        {/* Prediction Result - RIGHT AFTER SCANNER */}
        {result && (
          <MotionPaper
            id="prediction-report"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            elevation={5}
            sx={{
              mt: 5,
              p: 4,
              borderRadius: 4,
              backgroundColor: result.prediction === "Safe" ? "#E8F5E9" : "#FFEBEE",
              borderLeft: `8px solid ${result.prediction === "Safe" ? "#2E7D32" : "#C62828"}`,
              background: result.prediction === "Safe"
                ? "linear-gradient(135deg, #E8F5E9, #C8E6C9)"
                : "linear-gradient(135deg, #FFEBEE, #FFCDD2)",
            }}
          >
            <MotionBox
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
              sx={{ display: "flex", alignItems: "center", gap: 3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                {result.prediction === "Safe" ? (
                  <CheckCircle sx={{ fontSize: 70, color: "#2E7D32" }} />
                ) : (
                  <Warning sx={{ fontSize: 70, color: "#C62828" }} />
                )}
              </motion.div>

              <Box sx={{ flex: 1 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={result.prediction === "Safe" ? "#2E7D32" : "#C62828"}
                  >
                    {result.prediction === "Safe" ? "✅ SAFE WEBSITE" : "⚠️ PHISHING WEBSITE"}
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography sx={{ mt: 2 }}>
                    <strong>URL:</strong>
                  </Typography>
                  <Typography sx={{ wordBreak: "break-word", fontFamily: "monospace", fontSize: 12 }}>
                    {result.url}
                  </Typography>

                  <Typography sx={{ mt: 3 }}>
                    <strong>Confidence Score</strong>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={result.confidence * 100}
                    sx={{
                      mt: 1,
                      height: 12,
                      borderRadius: 10,
                      backgroundColor: result.prediction === "Safe" ? "#C8E6C9" : "#FFCDD2",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: result.prediction === "Safe" ? "#2E7D32" : "#C62828",
                        background: result.prediction === "Safe"
                          ? "linear-gradient(90deg, #2E7D32, #66BB6A)"
                          : "linear-gradient(90deg, #C62828, #EF5350)",
                      },
                    }}
                  />
                  <Typography sx={{ mt: 1, fontWeight: "bold", fontSize: 14 }}>
                    {(result.confidence * 100).toFixed(2)}%
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <RiskMeter
                    confidence={result.confidence}
                    prediction={result.prediction}
                  />
                  <Typography sx={{ mt: 3 }}>
                    <strong>Risk Level</strong>
                  </Typography>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Typography
                      fontWeight="bold"
                      color={result.prediction === "Safe" ? "green" : "red"}
                      sx={{ fontSize: 16 }}
                    >
                      {result.prediction === "Safe" ? "🟢 LOW RISK" : "🔴 HIGH RISK"}
                    </Typography>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                    background:
                      result.prediction === "Safe"
                        ? "rgba(46, 125, 50, 0.1)"
                        : "rgba(198, 40, 40, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                  >
                    🤖 AI Security Analysis
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    <strong>Prediction:</strong> {result.prediction}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    <strong>Risk Level:</strong> {result.prediction === "Safe" ? "LOW" : "HIGH"}
                  </Typography>

                  <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                    💡 Recommendation:
                  </Typography>

                  {result.prediction === "Safe" ? (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <li>✓ Website appears legitimate.</li>
                      <li>✓ Safe for browsing.</li>
                      <li>✓ Keep browser updated.</li>
                    </motion.ul>
                  ) : (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <li>✗ Do not enter passwords.</li>
                      <li>✗ Avoid making payments.</li>
                      <li>✗ Do not download files.</li>
                      <li>✗ Close the website immediately.</li>
                      <li>✗ Report the suspicious URL.</li>
                    </motion.ul>
                  )}

                  <Typography
                    sx={{
                      mt: 3,
                      color: "text.secondary",
                      fontSize: 12,
                    }}
                  >
                    Scan Time: {new Date().toLocaleString()}
                  </Typography>

                  <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                    AI Model: Random Forest Classifier
                  </Typography>
                </motion.div>
              </Box>
            </MotionBox>
          </MotionPaper>
        )}
{result && (
    <DownloadReport />
)}
        {/* Dashboard Cards */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 6, mb: 3 }}>
            📊 Dashboard Overview
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Accuracy" value={`${accuracy}%`} color="#7B1FA2" delay={0.1} />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Total Scans" value={totalScans} color="#b079e7" delay={0.2} />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Safe URLs" value={safeUrls} color="#2E7D32" delay={0.3} />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Phishing URLs" value={phishingUrls} color="#C62828" delay={0.4} />
            </Grid>
          </Grid>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          sx={{ mt: 5 }}
        >
          <StatsChart safe={safeUrls} phishing={phishingUrls} />
          <AnalyticsChart history={recentHistory} />
        </MotionBox>

        {/* Stats Grid & Recent Activity */}
        <MotionPaper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          elevation={4}
          sx={{ mt: 5, p: 4, borderRadius: 4 }}
        >
          <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Today's Scans" value={todayScans} color="#1976D2" delay={0.1} />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Highest Confidence" value={`${highConfidence}%`} color="#43A047" delay={0.2} />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Latest Result" value={latestPrediction} color="#FB8C00" delay={0.3} />
            </Grid>
            <Grid item xs={12} md={3}>
              <DashboardCard title="Last Scan" value={lastScanTime} color="#8E24AA" delay={0.4} />
            </Grid>
          </Grid>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              📜 Recent Activity
            </Typography>

            <MotionBox
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.1 }}
              sx={{ mt: 2, mb: 3 }}
            >
              <TextField
                fullWidth
                label="Search Recent URLs"
                placeholder="Search website..."
                value={dashboardSearch}
                onChange={(e) => setDashboardSearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  },
                }}
              />
            </MotionBox>

            {recentHistory.length === 0 ? (
              <Typography color="gray">No Scan History Available</Typography>
            ) : (
              recentHistory
                .filter((item) =>
                  item.url.toLowerCase().includes(dashboardSearch.toLowerCase())
                )
                .map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #eee",
                        py: 2,
                        transition: "all 0.3s",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.02)",
                          paddingLeft: 1,
                        },
                      }}
                    >
                      <Box>
                        <Typography fontWeight="bold" sx={{ wordBreak: "break-word" }}>
                          {item.url}
                        </Typography>
                        <Typography variant="body2" color="gray">
                          {new Date(item.created_at).toLocaleString()}
                        </Typography>
                      </Box>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Chip
                          label={item.prediction}
                          color={item.prediction === "Safe" ? "success" : "error"}
                        />
                      </motion.div>
                    </Box>
                  </motion.div>
                  
                ))
            )}
          </motion.div>
        </MotionPaper>
      </Container>
      <Footer />
    </>
  );
}


export default Home;