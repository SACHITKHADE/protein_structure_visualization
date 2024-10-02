// src/components/ProteinViewer.js
import React, { useEffect } from "react";
import * as $3Dmol from "3dmol";

const ProteinViewer = ({ pdbData }) => {
  useEffect(() => {
    const viewer = $3Dmol.createViewer(document.getElementById("viewer"), {
      defaultcolors: $3Dmol.rasmolElementColors,
    });

    viewer.addModel(pdbData, "pdb");
    viewer.setStyle({}, { cartoon: { color: "spectrum" } });
    viewer.zoomTo();
    viewer.render();
  }, [pdbData]);

  return <div id="viewer" style={{ width: "100%", height: "500px" }} />;
};

export default ProteinViewer;
