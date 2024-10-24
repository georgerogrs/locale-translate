import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { accentColor } from "../colors/colors";

interface Props {
  uploadJsonToBrowser: (files: any) => void;
}

const DragAndDrop = ({ uploadJsonToBrowser }: Props) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const styles = {
    dragndrop: {
      height: "100%",
      width: "50%",
      backgroundColor: dragging
        ? "rgba(173, 216, 230, 0.3)"
        : "rgba(0, 0, 0, 0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dragTitle: {
      fontWeight: 500,
      color: dragging ? accentColor : "lightgrey",
    },
    icon: {
      fontSize: 50,
      margin: -1,
      color: dragging ? accentColor : "lightgrey",
    },
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

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    uploadJsonToBrowser(event.dataTransfer.files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragExit={handleDragExit}
      onDrop={handleOnDrop}
      style={{
        ...styles.dragndrop,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <UploadFileIcon sx={styles.icon} />
      <h3 style={styles.dragTitle}>
        Drag and drop <br />
        your JSON file here
      </h3>
    </div>
  );
};

export default DragAndDrop;
