// src/components/ProteinInputForm.js
import React, { useState } from 'react';

const ProteinInputForm = ({ onSubmit }) => {
    const [proteinId, setProteinId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(proteinId);
        setProteinId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="inputField"
                placeholder="Enter Protein ID"
                value={proteinId}
                onChange={(e) => setProteinId(e.target.value)}
                required
            />
            <button type="submit" className="button">Fetch Data</button>
        </form>
    );
};

export default ProteinInputForm;
