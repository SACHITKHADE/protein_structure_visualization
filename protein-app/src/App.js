// src/App.js
import React, { useState } from "react";
import ProteinInputForm from "./components/ProteinInputForm";
import ProteinViewer from "./components/ProteinViewer";
import PLDDTScore from "./components/PLDDTScore";
import Loader from "./components/Loader";
import './App.css'; // Import the CSS file
import axios from "axios";

function App() {
  const [proteinData, setProteinData] = useState(null);
  const [plddtScore, setPlddtScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proteinId, setProteinId] = useState(''); // Track the protein ID

  const fetchProteinData = async (id) => {
    setLoading(true); // Start loading
    setProteinId(id); // Set the current protein ID
    try {
      console.log(`Fetching data for protein ID: ${id}`);
      const response = await axios.get(`http://localhost:5000/api/predict/${id}`);
      console.log('Response data:', response.data);
      setProteinData(response.data.pdb);
      setPlddtScore(response.data.plddt);
    } catch (error) {
      console.error("Error fetching protein data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const downloadPDB = async () => {
    try {
      const response = await axios({
        url: `http://localhost:5000/api/download/${proteinId}`,
        method: 'GET',
        responseType: 'blob', // Important
      });

      // Create a URL for the blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${proteinId}.pdb`); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDB file:", error);
    }
  };

  return (
    <div className="container">
      <h1>Protein Structure Prediction</h1>
      <ProteinInputForm onSubmit={fetchProteinData} />
      {loading && <Loader />}
      {proteinData && (
        <div className="results">
          <h2 className="results-title">Protein Structure:</h2>
          <ProteinViewer pdbData={proteinData} />
          <button className="button" onClick={downloadPDB}>Download PDB File</button>
        </div>
      )}
      {plddtScore && <PLDDTScore plddt={plddtScore} />}
    </div>
  );
}

export default App;
