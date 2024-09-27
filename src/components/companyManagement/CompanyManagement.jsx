import React, { useEffect } from "react";
import CustomTabelComponents from "../utils/CustomTableComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  companyError,
  getAllCompanyData,
  getCompanyData,
} from "../redux/reducers/companySlice";
import { Box, Typography } from "@mui/material";

const CompanyManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector(companyError);
  const companyData = useSelector(getCompanyData);
  const columns = [
    {
      field: "id",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Comp ID",
      width: 150,
    },
    {
      field: "name",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Company Name",
      width: 150,
    },
    {
      field: "address",
      align: "center",
      type: "number",
      headerAlign: "center",
      headerName: "Adderess",
      width: 150,
    },
    {
      field: "website",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Company Website",
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

  useEffect(() => {
    dispatch(getAllCompanyData());
  }, [dispatch]);

  const handlenewlocation = () => {
    navigate("/AddCompany");
  };

  const handleview = (id) => {
    navigate(`/UpdateCompany/${id}`);
  };
  return (

    <Box sx={{ p: 2 }}>
      <div>
        <Typography variant="h6" color={"#010745"} fontWeight={"bold"}>
          Manage CompanyDetails
        </Typography>
      </div>
      <CustomTabelComponents
        butname="Add Company"
        columns={columns}
        handlenewlocation={handlenewlocation}
        data={companyData}
        handleview={handleview}
        loader={loader}
      />
    </Box>
  );
};
export default CompanyManagement;
