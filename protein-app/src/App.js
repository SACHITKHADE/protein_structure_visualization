// src/App.js
import React, { useState } from "react";
import ProteinInputForm from "./components/ProteinInputForm";
import ProteinViewer from "./components/ProteinViewer";
import PLDDTScore from "./components/PLDDTScore";
import axios from "axios";

function App() {
  const [proteinData, setProteinData] = useState(null);
  const [plddtScore, setPlddtScore] = useState(null);

  const fetchProteinData = async (proteinId) => {
    try {
      console.log(`Fetching data for protein ID: ${proteinId}`);
      const response = await axios.get(`http://localhost:5000/api/predict/${proteinId}`);
      console.log('Response data:', response.data);
      setProteinData(response.data.pdb);
      setPlddtScore(response.data.plddt);
    } catch (error) {
      console.error("Error fetching protein data:", error);
    }
  };

  return (
    <div>
      <h1>Protein Structure Prediction</h1>
      <ProteinInputForm onSubmit={fetchProteinData} />
      {proteinData && <ProteinViewer pdbData={proteinData} />}
      {plddtScore && <PLDDTScore plddt={plddtScore} />}
    </div>
  );
}

export default App;
