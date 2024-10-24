import { accentColor } from "../colors/colors";
import { Box, Typography } from "@mui/material";

const TitleHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgba(1, 1, 1, 0.15)",
      }}
    >
      <h1
        style={{
          fontWeight: 500,
          color: "lightgrey",
        }}
      >
        Locale
        <span
          style={{
            fontWeight: "bold",
            color: accentColor,
          }}
        >
          {" "}
          JSON{" "}
        </span>
        Translate
      </h1>
    </Box>
  );
};

export default TitleHeader;
