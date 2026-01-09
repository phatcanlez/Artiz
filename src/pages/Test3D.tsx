import React from "react";
import "@google/model-viewer";

const Test3D = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <h1 style={{ color: "white", padding: "20px" }}>Test 3D Viewer</h1>
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
        alt="Astronaut"
        auto-rotate
        camera-controls
        style={{
          width: "100%",
          height: "calc(100vh - 100px)",
          display: "block",
        }}
      />
    </div>
  );
};

export default Test3D;
