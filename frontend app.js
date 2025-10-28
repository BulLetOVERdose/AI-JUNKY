import React, { useState } from "react";
import axios from "axios";
import PaymentForm from "./components/PaymentForm";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const generateContent = async () => {
    if (!prompt) return;
    try {
      const res = await axios.post("http://localhost:5000/generate", { prompt });
      setResult(res.data.output);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>AI Content Generator</h1>
      <textarea
        rows="5"
        style={{ width: "100%" }}
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateContent} style={{ marginTop: "10px" }}>Generate</button>
      {result && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
      <div style={{ marginTop: "30px" }}>
        <h2>Premium Plan Payment</h2>
        <PaymentForm />
      </div>
    </div>
  );
}

export default App;

