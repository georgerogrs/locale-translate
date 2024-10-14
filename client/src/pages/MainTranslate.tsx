import React from "react";
import DragAndDrop from "../components/DragAndDrop";

const MainTranslate = () => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
    },
    titleStyle: {
      fontWeight: "bold",
    },
  };
  return (
    <div style={{ ...styles.container, flexDirection: "column" }}>
      <h1 style={styles.titleStyle}>Locale JSON Translate</h1>
      <DragAndDrop />
    </div>
  );
};

export default MainTranslate;
