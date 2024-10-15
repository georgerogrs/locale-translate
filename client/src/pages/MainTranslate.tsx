import React, { useEffect, useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import TitleHeader from "../components/TitleHeader";

const MainTranslate = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [translatedJsonData, setTranslatedJsonData] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("german");

  const styles = {
    mainContainer: {
      display: "flex",
      alignItems: "center",
    },
    rootContainer: {
      display: "flex",
      height: "500px",
      width: "100%",
      justifyContent: "center",
    },
    container: {
      width: "80%",
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
    translatedBox: {
      border: "3px dashed black",
      borderRadius: "5px",
      height: "100%",
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    translatedTitle: {
      paddingBottom: 20,
    },
    result: {
      height: "100%",
      width: "50%",
      border: "1px solid black",
      fontSize: 13,
    },
    inputContainer: {
      height: "100%",
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    resetButton: {
      marginTop: 10,
    },
  };

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value);
  };

  const reset = () => {
    setSelectedLanguage("german");
    setJsonData(null);
    setTranslatedJsonData(null);
  };

  const uploadJsonToBrowser = async (files: any) => {
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

  useEffect(() => {
    if (jsonData) {
      console.log("jsonData:", jsonData);
      // Translate
      try {
        fetch(`/translate/${selectedLanguage}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Network response was not ok.");
            }
          })
          .then((germanJson) => {
            setTranslatedJsonData(germanJson);
          })
          .catch((error) => {
            console.error("Error fetching translation:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [jsonData]);

  return (
    <div style={{ ...styles.mainContainer, flexDirection: "column" }}>
      <TitleHeader />
      <div style={styles.rootContainer}>
        {error && (
          <div style={styles.errorContainer}>
            <h4 style={{ ...styles.errorStyle, textAlign: "center" }}>
              {error}
            </h4>
          </div>
        )}
        <div style={{ ...styles.container, flexDirection: "row" }}>
          {!jsonData ? (
            <>
              <DragAndDrop uploadJsonToBrowser={uploadJsonToBrowser} />
              <div style={styles.inputContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="language-select" style={{ marginBottom: 10 }}>
                    Select a language:
                  </label>
                  <select
                    name="languages"
                    id="language-select"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    <option value="german">German</option>
                    <option value="french">French</option>
                    <option value="hungarian">Hungarian</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={styles.result} contentEditable={true}>
                {JSON.stringify(jsonData, null, 2)}
              </div>
              {!translatedJsonData ? (
                <div style={{ ...styles.translatedBox, textAlign: "center" }}>
                  <h3 style={styles.translatedTitle}>
                    Translating to{" "}
                    {selectedLanguage[0].toUpperCase() +
                      selectedLanguage.slice(1)}
                    ...
                  </h3>
                </div>
              ) : (
                <div style={styles.result} contentEditable={true}>
                  {JSON.stringify(translatedJsonData, null, 2)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {jsonData && (
        <button onClick={reset} style={styles.resetButton}>
          Reset
        </button>
      )}
    </div>
  );
};

export default MainTranslate;
