// src/components/ProteinInputForm.js
import React, { useState } from "react";
import axios from "axios";

const ProteinInputForm = ({ onSubmit }) => {
  const [proteinId, setProteinId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(proteinId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Protein ID"
        value={proteinId}
        onChange={(e) => setProteinId(e.target.value)}
        required
      />
      <button type="submit">Predict Structure</button>
    </form>
  );
};

export default ProteinInputForm;
