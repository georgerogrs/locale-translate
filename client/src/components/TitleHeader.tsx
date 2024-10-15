import { accentColor } from "../colors/colors";

const TitleHeader = () => {
  const styles = {
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
    },
    titleStyle: {
      fontWeight: 500,
      color: "lightgrey",
    },
    json: {
      fontWeight: "bold",
      color: accentColor,
    },
  };
  return (
    <div style={styles.header}>
      <h1 style={styles.titleStyle}>
        Locale<text style={styles.json}> JSON </text>Translate
      </h1>
    </div>
  );
};

export default TitleHeader;
