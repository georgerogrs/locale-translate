import { useEffect, useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import TitleHeader from "../components/TitleHeader";

const MainTranslate = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [translatedJsonData, setTranslatedJsonData] = useState<any>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("german");

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value);
  };

  const reset = () => {
    setSelectedLanguage("german");
    setJsonData(null);
    setTranslatedJsonData(null);
  };

  const uploadJsonToBrowser = async (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];

      // Check if the dropped file is a JSON file
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const json = JSON.parse(event.target?.result as string);
            setJsonData(json);
            setError(null);
          } catch (error) {
            setError("Invalid JSON file");
            console.error("Invalid JSON file:", error);
            setJsonData(null);
          }
        };
        reader.readAsText(file);
      } else {
        setError("Please drop a valid JSON file");
        setJsonData(null);
      }
    }
  };

  useEffect(() => {
    const fetchTranslation = async () => {
      if (jsonData) {
        try {
          // Translate
          const response = await fetch(`/translate/${selectedLanguage}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });

          if (response.ok) {
            const data = await response.json();
            setTranslatedJsonData(data);
          } else {
            throw new Error("Network response was not ok.");
          }
        } catch (error) {
          console.error("Error fetching translation:", error);
        }
      }
    };

    fetchTranslation(); // Call the async function
  }, [jsonData, selectedLanguage]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TitleHeader />
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "lightblue",
        }}
      >
        <div style={{ padding: 10 }}>
          {!jsonData && (
            <>
              <label
                htmlFor="language-select"
                style={{ color: "black", fontSize: 15, marginRight: 10 }}
              >
                Language:
              </label>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                style={{ fontSize: 12 }}
              >
                <option style={{ fontSize: 12 }} value="german">
                  English
                </option>
                <option style={{ fontSize: 12 }} value="german">
                  German
                </option>
                <option style={{ fontSize: 12 }} value="french">
                  French
                </option>
                <option style={{ fontSize: 12 }} value="hungarian">
                  Hungarian
                </option>
                <option style={{ fontSize: 12 }} value="spanish">
                  Spanish
                </option>
                <option style={{ fontSize: 12 }} value="italian">
                  Italian
                </option>
                <option style={{ fontSize: 12 }} value="portuguese">
                  Portuguese
                </option>
                <option style={{ fontSize: 12 }} value="chinese">
                  Chinese
                </option>
                <option style={{ fontSize: 12 }} value="japanese">
                  Japanese
                </option>
                <option style={{ fontSize: 12 }} value="korean">
                  Korean
                </option>
                <option style={{ fontSize: 12 }} value="russian">
                  Russian
                </option>
                <option style={{ fontSize: 12 }} value="arabic">
                  Arabic
                </option>
              </select>
            </>
          )}
          {jsonData && (
            <button onClick={reset} style={{ marginLeft: 10 }}>
              Reset
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          minHeight: "500px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {error && (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h4
              style={{
                width: "80%",
                backgroundColor: "red",
                color: "white",
                padding: 10,
                borderRadius: 5,
                textAlign: "center",
              }}
            >
              {error}
            </h4>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          {!jsonData ? (
            <DragAndDrop uploadJsonToBrowser={uploadJsonToBrowser} />
          ) : (
            <>
              <div
                contentEditable={true}
                style={{
                  height: "100%",
                  width: "50%",
                  color: "black",
                  backgroundColor: "white",
                  border: "1px solid black",
                  fontSize: 13,
                  marginRight: 1,
                }}
              >
                {JSON.stringify(jsonData, null, 2)}
              </div>
              {!translatedJsonData ? (
                <div
                  style={{
                    border: "1px solid black",
                    borderRadius: 5,
                    height: "100%",
                    width: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ paddingBottom: 20 }}>
                    Translating to{" "}
                    {selectedLanguage[0].toUpperCase() +
                      selectedLanguage.slice(1)}
                    ...
                  </h3>
                </div>
              ) : (
                <div
                  contentEditable={true}
                  style={{
                    height: "100%",
                    width: "50%",
                    color: "black",
                    backgroundColor: "white",
                    border: "1px solid black",
                    fontSize: 13,
                  }}
                >
                  {JSON.stringify(translatedJsonData, null, 2)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainTranslate;
