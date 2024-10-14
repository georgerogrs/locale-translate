import React, { useEffect, useState } from "react";

const DragAndDrop = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const styles = {
    rootContainer: { display: "flex", height: "500px", width: "100%" },
    container: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
    },
    errorContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    errorStyle: {
      width: "80%",
      backgroundColor: "red",
      color: "white",
      padding: 10,
      borderRadius: 5,
    },
    dragndrop: {
      border: "3px dashed black",
      borderRadius: "5px",
      height: "100%",
      width: "50%",
      backgroundColor: dragging ? "lightgrey" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dragTitle: {
      paddingBottom: 20,
    },
    result: { height: "100%", width: "50%" },
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Stops browser from doing any other actions with drag and drop (e.g. opening file in new tab)
    setDragging(true);
  };

  const handleDragExit = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      // Check if the dropped file is a JSON file
      if (file.type === "application.json" || file.name.endsWith(".json")) {
        const reader = new FileReader(); // creates new instance of filereader which allows browser to read file on user computer
        reader.onload = (event) => {
          // Trying to successfully read file user uploaded
          try {
            const json = JSON.parse(event.target?.result as string);
            setJsonData(json);
            setError(null);
          } catch (error) {
            setError("Invalid JSON file");
            setJsonData(null);
          }
        };
        reader.readAsText(file); // Reads file as text and activates onload event
      } else {
        setError("Please drop a valid JSON file");
        setJsonData(null);
      }
    }
  };
  return (
    <div style={styles.rootContainer}>
      {error && (
        <div style={styles.errorContainer}>
          <h4 style={{ ...styles.errorStyle, textAlign: "center" }}>{error}</h4>
        </div>
      )}
      <div style={{ ...styles.container, flexDirection: "row" }}>
        {!jsonData ? (
          <div
            onDragOver={handleDragOver}
            onDragExit={handleDragExit}
            onDrop={handleDrop}
            style={{ ...styles.dragndrop, textAlign: "center" }}
          >
            <h3 style={styles.dragTitle}>Drag your JSON file here</h3>
          </div>
        ) : (
          <>
            <textarea
              style={styles.result}
              readOnly
              value={JSON.stringify(jsonData, null, 2)}
            />
            <div style={{ ...styles.dragndrop, textAlign: "center" }}>
              <h3 style={styles.dragTitle}>Translating to German...</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
