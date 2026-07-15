import { useEffect, useState } from "react";
import api from "../api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TextField,
  MenuItem,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function History({ mode, toggleTheme }) {

  const [history, setHistory] = useState([]);

  const [filteredHistory, setFilteredHistory] =
    useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const loadHistory = async () => {

    try {

      const res = await api.get("/history/");

      setHistory(res.data);

      setFilteredHistory(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Unable to load history");

    }

  };

  useEffect(() => {

    loadHistory();

  }, []);

  useEffect(() => {

    let data = [...history];

    if (filter !== "All") {

      data = data.filter(
        (item) => item.prediction === filter
      );

    }

    if (search.trim() !== "") {

      data = data.filter((item) =>
        item.url
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    setFilteredHistory(data);

  }, [history, search, filter]);

  const deleteRecord = async (id) => {

    if (!window.confirm("Delete this record?"))
      return;

    try {

      await api.delete(`/history/${id}`);
      toast.success("History Deleted Successfully");
      setHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {

      console.error(err);

      toast.error("Delete Failed");

    }

  };

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(filteredHistory);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "History"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(file, "Prediction_History.xlsx");
    toast.success("Excel Exported");
  };

  const exportCSV = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(filteredHistory);

    const csv =
      XLSX.utils.sheet_to_csv(worksheet);

    const file = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(file, "Prediction_History.csv");
    toast.success("CSV Exported");
  };

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Prediction History",
      14,
      15
    );

    autoTable(doc, {

      head: [[
        "URL",
        "Prediction",
        "Confidence",
        "Date"
      ]],

      body: filteredHistory.map((item) => [

        item.url,

        item.prediction,

        `${(item.confidence * 100).toFixed(2)}%`,

        new Date(
          item.created_at
        ).toLocaleString(),

      ]),

    });

    doc.save("Prediction_History.pdf");
    toast.success("PDF Exported");
  };

    return (
    <>
      <Navbar
  mode={mode}
  toggleTheme={toggleTheme}
/>

      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >

        {/* Page Title */}

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          📜 Prediction History
        </Typography>

        {/* Statistics */}

        <Grid container spacing={3} sx={{ mb: 4 }}>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6">
                Total Records
              </Typography>

              <Typography
                variant="h3"
                color="primary"
              >
                {history.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6">
                Safe URLs
              </Typography>

              <Typography
                variant="h3"
                color="success.main"
              >
                {
                  history.filter(
                    (item) =>
                      item.prediction === "Safe"
                  ).length
                }
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6">
                Phishing URLs
              </Typography>

              <Typography
                variant="h3"
                color="error.main"
              >
                {
                  history.filter(
                    (item) =>
                      item.prediction ===
                      "Phishing"
                  ).length
                }
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* Search + Filter */}

        <Grid
          container
          spacing={2}
          sx={{ mb: 3 }}
        >

          <Grid item xs={12} md={8}>

            <TextField
              fullWidth
              label="Search URL"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

          </Grid>

          <Grid item xs={12} md={4}>

            <TextField
              select
              fullWidth
              label="Filter"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <MenuItem value="All">
                All
              </MenuItem>

              <MenuItem value="Safe">
                Safe
              </MenuItem>

              <MenuItem value="Phishing">
                Phishing
              </MenuItem>

            </TextField>

          </Grid>

        </Grid>

        {/* Export Buttons */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >

          <Button
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
            onClick={exportExcel}
          >
            Excel
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={exportCSV}
          >
            CSV
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<DownloadIcon />}
            onClick={exportPDF}
          >
            PDF
          </Button>

        </Box>

        <Typography
          sx={{ mb: 2 }}
          fontWeight="bold"
        >
          Total Records Found :
          {" "}
          {filteredHistory.length}
        </Typography>

        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >

          <Table>

            <TableHead>

              <TableRow
                sx={{
                  backgroundColor: "#1565C0",
                }}
              >

                <TableCell sx={{ color: "white" }}>
                  ID
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  URL
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  Status
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  Confidence
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  Date
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  Action
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filteredHistory.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No Records Found
                  </TableCell>

                </TableRow>

              ) : (

                filteredHistory.map((item) => (

                  <TableRow
                    key={item.id}
                    hover
                  >

                    <TableCell>
                      {item.id}
                    </TableCell>

                    <TableCell
                      sx={{
                        maxWidth: 350,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.url}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={item.prediction}
                        color={
                          item.prediction === "Safe"
                            ? "success"
                            : "error"
                        }
                      />

                    </TableCell>

                    <TableCell>
                      {(item.confidence * 100).toFixed(2)}%
                    </TableCell>

                    <TableCell>
                      {new Date(
                        item.created_at
                      ).toLocaleString()}
                    </TableCell>

                    <TableCell>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() =>
                          deleteRecord(item.id)
                        }
                      >
                        Delete
                      </Button>

                    </TableCell>

                  </TableRow>

                ))

              )}

            </TableBody>

          </Table>

        </Paper>

      </Container>
<Footer />
    </>
  );

}

export default History;