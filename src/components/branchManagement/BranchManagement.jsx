import React, { useEffect } from "react";
import CustomTabelComponents from "../utils/CustomTableComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { branchError, getAllBranchData, getBranchData } from "../redux/reducers/branchSlice";
const BranchManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector(branchError);
  const branchData = useSelector(getAllBranchData)
  console.log("branchData===>", branchData)
  const columns = [
    {
      field: "id",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Branch ID",
      width: 150,
    },
    {
      field: "branch_name",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Branch Name",
      width: 150,
    },
    {
      field: "branch_address",
      align: "center",
      type: "number",
      headerAlign: "center",
      headerName: "Branch Address",
      width: 150,
    },
    {
      field: "company_name",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Company name",
      width: 150,
    },
    {
      field: "created_by",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Created By",
      width: 150,
    },
  ];

  const handlenewlocation = () => {
    navigate("/AddBranchComponent");
  };

  const handleview = (id) => {
    // console.log("id===>", id)
    navigate(`/UpdateBranchComponent/${id}`)
  };
  useEffect(() => {
    dispatch(getBranchData())
  }, [dispatch])
  return (
    <>
      <Box sx={{ p: 2 }}>
        <div>
          <Typography variant="h6" color={"#010745"} fontWeight={"bold"}>
            Manage BranchDetails
          </Typography>
        </div>
        <CustomTabelComponents
          butname="Add Branch"
          columns={columns}
          data={branchData}
          handlenewlocation={handlenewlocation}
          handleview={handleview}
          loader={loader}
        />
      </Box>
    </>
  )
};

export default BranchManagement;
