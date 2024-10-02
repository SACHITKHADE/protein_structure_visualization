// src/components/Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div style={loaderStyle}>
      <p>Loading...</p>
    </div>
  );
};

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  fontSize: '24px',
  color: '#007BFF', // Bootstrap primary color for visual appeal
};

export default Loader;
