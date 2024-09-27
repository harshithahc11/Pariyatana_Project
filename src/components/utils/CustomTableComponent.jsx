import React from "react";
import { Box, Button, createTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { ThemeProvider } from "@emotion/react";
const CustomTabelComponents = ({
  butname,
  columns,
  data,
  handlenewlocation,
  handleview,
  handledelete,
  loader,
}) => {
  const viewbtntheme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: "1rem",
            backgroundColor: "transparent",
            padding: "4px 11px",
            // fontSize:'0.85rem',
            "&:hover": {
              backgroundColor: "#ffff",
            },
          },
        },
      },
    },
  });
  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      textAlign: "center",
      width: "200",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <ThemeProvider theme={viewbtntheme}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => handleview(params.row.id)}
                startIcon={<EditRoundedIcon />}
              />
            </ThemeProvider>
            <ThemeProvider theme={viewbtntheme}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => handledelete(params.row.id)}
                startIcon={<DeleteIcon />}
              />
            </ThemeProvider>
          </Box>
        );
      },
    },
  ];
  return (
    <>
      <Box sx={{ textAlign: "right", margin: "1em 0" }}>
        <Button
          sx={{ backgroundColor: "white" }}
          variant="outlined"
          startIcon={<Add />}
          onClick={handlenewlocation}
        >
          {butname}
        </Button>
      </Box>

      <Box
        width="auto"
        height="65vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "15px",
          },
          "& .name-column--cell": {
            color: "grey",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#EFF4FA",
            borderBottom: "none",
            fontSize: "18px",
            fontFamily: "Poppins",
            fontWeight: 700,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#EFF4FA",
          },
          "& .MuiCheckbox-root": {
            color: `green !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `black !important`,
          },
          "& .MuiDataGrid-overlay .MuiCircularProgress-root": {
            color: "black",
          },
        }}
      >
        <DataGrid
          rows={data || []}
          components={{ Toolbar: GridToolbar }}
          columns={columns.concat(actionColumns)}
          disableSelectionOnClick
          getRowId={(row) => row.id}
          experimentalFeatures={{ newEditingApi: true }}
          loading={loader}
        />
      </Box>
    </>
  );
};
export default CustomTabelComponents;
