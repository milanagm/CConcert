import React from "react";

const ImageViewer = ({ image }) => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
    }}
  >
    <img
      src={image}
      alt="Selected"
      style={{ maxWidth: "90%", maxHeight: "90%" }}
    />
  </div>
);

export default ImageViewer;
