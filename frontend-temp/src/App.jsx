import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/history");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const predict = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/predict/",
        {
          url: url,
        }
      );

      setResult(res.data);
      loadHistory();
    } catch (err) {
      alert("Backend is not running");
    }
  };

  return (
    <div style={{ width: "80%", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>AI Phishing Detection System</h1>

      <input
        type="text"
        placeholder="Enter Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", padding: "10px" }}
      />

      <button
        onClick={predict}
        style={{ marginLeft: "10px", padding: "10px 20px" }}
      >
        Predict
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>{result.prediction}</h2>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}

      <hr />

      <h2>Prediction History</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Prediction</th>
            <th>Confidence</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.url}</td>
              <td>{item.prediction}</td>
              <td>{(item.confidence * 100).toFixed(2)}%</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;