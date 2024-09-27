import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";

const ImageHover = ({ values }) => {
  const [open, setOpen] = useState(false);

  const [hoveredContent, setHoveredContent] = useState(null);

  // image functionality

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: 400,
    height: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const onClick = (e) => {
    setHoveredContent(e.target.textContent);
    setOpen(true);
  };

  const clearHoveredImage = () => {
    setHoveredContent(null);
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} textAlign={"center"}>
        <span
          title="Click here"
          onClick={onClick}
          style={{ borderBottom: "1px solid blue", cursor: "pointer" }}
        >
          View
        </span>
      </Grid>
      <Modal
        open={open}
        onClose={clearHoveredImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            color={"grey"}
            textAlign={"center"}
            fontSize={20}
            fontWeight={"bold"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Company Logo
          </Typography>
          {hoveredContent && (
            <img src={values} width={280} height={180} alt="Hovered" />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ImageHover;
