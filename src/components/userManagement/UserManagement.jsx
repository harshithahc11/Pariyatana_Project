import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUserData, getUserData, userError } from "../redux/reducers/userSlice";
import UserTabelComponents from "../utils/UserTableComponent";
import { Box, Typography } from "@mui/material";
const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  console.log("userdata===>", userData);
  const loader = useSelector(userError)
  const columns = [
    {
      field: "id",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "User ID",
      width: 150,
    },
    {
      field: "name",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "User Name",
      width: 150,
    },
    {
      field: "email",
      align: "center",
      type: "number",
      headerAlign: "center",
      headerName: "Email",
      width: 150,
    },
    {
      field: "role_name",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Role",
      width: 150,
    },
    {
      field: "phone",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Phone No",
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
    dispatch(getAllUserData());
  }, [dispatch]);

  const handleview = (id) => {
    navigate(`/UpdateUser/${id}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <div>
        <Typography variant="h6" color={"#010745"} fontWeight={"bold"} sx={{ paddingBottom: "1em" }}>
          Manage UserDetails
        </Typography>
      </div>
      <UserTabelComponents
        columns={columns}
        handleview={handleview}
        data={userData}
        loader={loader}
      />
    </Box>
  );
};

export default UserManagement;
