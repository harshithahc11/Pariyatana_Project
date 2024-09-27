import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import TextFieldComponent from "../utils/TextFieldComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBranchList,
  getAllCompanyList,
  getBranchList,
  getCompanyList,
  getSingleUserData,
  getUniqueUserData,
  updateUserData,
} from "../redux/reducers/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import useauth from "../customHooks/useauth";
import Swal from "sweetalert2";
import CompanyDropDownComponent from "../utils/CompanyDropDownComponent";
import BranchDropDownComponent from "../utils/BranchDropDownComponent";
const UpdateUser = () => {
  const { role_id } = useauth();
  const { uid } = useParams();
  const [compList, setCompList] = useState(null);
  console.log("compList===>", compList)
  const [selectedbranch, setselectedBranch] = useState(null);
  console.log("selectedbranch", selectedbranch);
  const [roleselected, setroleselected] = useState();
  console.log("roleselected===>", roleselected);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleuserdata = useSelector(getUniqueUserData);
  console.log("singleuserdata===>", singleuserdata);
  const companyList = useSelector(getCompanyList);
  console.log("companyList===>", companyList);
  const branchList = useSelector(getBranchList);
  console.log("branchList==>", branchList)
  const editsuperRole = [
    { role_id: 2000, label: "superAdmin", value: "superAdmin" },
    { role_id: 3000, label: "companyAdmin", value: "companyAdmin" },
    { role_id: 4000, label: "branchAdmin", value: "branchAdmin" },
    { role_id: 5000, label: "branchUser", value: "branchUser" },

  ];

  const editCompanyRole = [
    { role_id: 3000, label: "companyAdmin", value: "companyAdmin" },
    { role_id: 4000, label: "branchAdmin", value: "branchAdmin" },
    { role_id: 5000, label: "branchUser", value: "branchUser" },
  ];

  const editBranchRole = [
    { role_id: 4000, label: "branchAdmin", value: "branchAdmin" },
    { role_id: 5000, label: "branchUser", value: "branchUser" },
  ];

  const butttheme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: "1rem",
            backgroundColor: "#073E9A",
            "&:hover": {
              backgroundColor: "#073E9A",
            },
          },
        },
      },
    },
  });
  const initialValues = {
    id: "",
    name: "",
    email: "",
    phone: "",
    role_name: "",
    branch_id: "",
    company_id: "",
  };
  const checkoutSchema = yup.object().shape({
    // id: yup.string().required("Required*"),
    name: yup.string().required("Required*"),
    // email: yup.string().email("enter the correct email").required("Required*"),
    // phone: yup.number().required("Required*"),
    role_name: yup.string().required("Required*"),
  });
  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      id: values.id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      role_id: roleselected.role_id || role_id,
      // role_name: roleselected.role_name,
      branch_id: selectedbranch.id,
      company_id: compList.id,
      // company_name: compList.company_name,
      // branch_name: selectedbranch.branch_name,
    };
    console.log("data====>", data);
    if (roleselected.label === "superAdmin") {
      data.company_id = null;
      data.branch_id = null;
    }
    const response = await dispatch(updateUserData(data));
    if (response.payload) {
      Swal.fire({
        title: "User Data Updated Succesfully!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/UserManagement");
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getSingleUserData(uid));
    dispatch(getAllCompanyList());
  }, [dispatch, uid]);

  useEffect(() => {
    // if (singleuserdata && singleuserdata.role_name) {
    //   setroleselected({
    //     label: singleuserdata.role_name
    //     , value: singleuserdata?.role_name
    //       === "superAdmin" ? "superAdmin" : singleuserdata?.role_name
    //         === "companyAdmin" ? "companyAdmin" : singleuserdata?.role_name
    //           === "branchAdmin" ? "branchAdmin" : singleuserdata?.role_name
    //             === "branchUser" ? "branchUser" : singleuserdata?.role_name
    //               === "newUser" ? "newUser" : null
    //   });
    // }
    if (singleuserdata && singleuserdata.role_name) {
      setroleselected({
        label: singleuserdata.role_name, value: singleuserdata?.role_name === "superAdmin" ? "superAdmin" : singleuserdata?.role_name === "companyAdmin" ?
          "companyAdmin" : singleuserdata?.role_name === "branchAdmin" ?
            "branchAdmin" : singleuserdata?.role_name === "branchUser" ? "branchUser" : singleuserdata?.role_name === "newUser" ? "newUser" : null
      });
    }
    if (singleuserdata && singleuserdata.role_name) {
      setroleselected({ label: singleuserdata.role_name, value: singleuserdata.role_name });
    }
    if (compList?.id) {
      dispatch(getAllBranchList(compList?.id))
    }
  }, [dispatch, compList]);
  useEffect(() => {
    if (singleuserdata && singleuserdata.role_name) {
      setroleselected({ label: singleuserdata.role_name });
      // console.log("setroleselected===>", setroleselected);
    }

    if (singleuserdata && singleuserdata.company_id) {
      const company = companyList.find(
        (ele) => ele.id === singleuserdata.company_id
      );
      console.log("selected company ==>", company);
      setCompList(company);
    }
    if (singleuserdata && singleuserdata.branch_id) {
      const branch = branchList.find(
        (ele) => ele.id === singleuserdata.branch_id
      );
      console.log("selected branch ==>", branch);
      setselectedBranch(branch);
    }
  }, [singleuserdata]);



  const handleback = () => {
    navigate(-1);
  };

  const options = role_id
    === 2000 ? editsuperRole.slice(1) : role_id
      === 3000 ? editCompanyRole.slice(1) : role_id
        === 4000 ? editBranchRole.slice(1) : [];
  return (
    <>
      <Box padding={2} bgcolor={"white"}>
        <div>
          <Typography variant="h6" color={"#010745"} fontWeight={"bold"}>
            Update User Details
          </Typography>
        </div>

        <Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={singleuserdata && uid ? singleuserdata : initialValues}
            validationSchema={checkoutSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={5} p="20px">
                  <Grid item xs={6}>
                    <InputLabel>ID</InputLabel>
                    <TextFieldComponent
                      name="id"
                      proId={uid}
                      values={values.id}
                      errors={errors.id}
                      touched={touched.id}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>Name</InputLabel>
                    <TextFieldComponent
                      name="name"
                      values={values.name}
                      errors={errors.name}
                      touched={touched.name}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>Email</InputLabel>
                    <TextFieldComponent
                      name="email"
                      values={values.email}
                      errors={errors.email}
                      touched={touched.email}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel>Phone No</InputLabel>
                    <TextFieldComponent
                      name="phone"
                      values={values.phone}
                      errors={errors.phone}
                      touched={touched.phone}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      onChange={(event, value) => setroleselected(value)}
                      id="combo-box-demo"
                      options={options}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      getOptionLabel={(option) => option.label}
                      value={roleselected || null}
                      sx={{ width: "100%", marginTop: "7px" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Role*"
                          name="role_name"
                          variant="outlined"
                        // helperText={errors.role_name}
                        />
                      )}
                    />
                  </Grid>
                  {/* 
                  {roleselected !== null &&
                    (
                      roleselected.label === "companyAdmin" ||
                      roleselected.label === "branchAdmin" || roleselected.label === "branchUser" || roleselected.label === "newUser") ? ( */}
                  <Grid item xs={6}>
                    <CompanyDropDownComponent
                      label={"select the company"}
                      arrayData={singleuserdata}
                      name={"company_name"}
                      options={companyList}
                      stateData={compList}
                      setStateData={setCompList}
                      inputerror={"please select the company"}
                    />
                  </Grid>
                  {/* ) : null} */}
                  {/* {roleselected !== null &&
                    (
                      roleselected.label === "companyAdmin" ||
                      roleselected.label === "branchAdmin" || roleselected.label === "branchUser" || roleselected.label === "newUser") ? ( */}
                  <Grid item xs={6}>
                    <BranchDropDownComponent
                      label={"select the branch"}
                      name={"branch_name"}
                      arrayData={singleuserdata}
                      options={branchList || []}
                      stateData={selectedbranch}
                      setStateData={setselectedBranch}
                      inputerror={"please select the branch"}
                    />
                  </Grid>
                  {/* ) : null} */}
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "25px",
                    padding: "25px",
                  }}
                >
                  <ThemeProvider theme={butttheme}>
                    <Button
                      variant="contained"
                      icon={<ArrowBack />}
                      onClick={handleback}
                    >
                      Back
                    </Button>
                  </ThemeProvider>
                  <ThemeProvider theme={butttheme}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{ fontSize: "15px", padding: "10px 60px" }}
                    >
                      Submit
                    </Button>
                  </ThemeProvider>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};
export default UpdateUser;
const editsuperRole = [
  { label: "companyAdmin", value: "companyAdmin" },
  { label: "branchAdmin", value: "branchAdmin" },
  { label: "branchUser", value: "branchUser" },
  { label: "newUser", value: "newUser" },
  { label: "Guide", value: "Guide" },
];

const editCompanyRole = [
  { label: "branchAdmin", value: "branchAdmin" },
  { label: "branchUser", value: "branchUser" },
  { label: "newUser", value: "newUser" },
  { label: "Guide", value: "Guide" },
];

const editBranchRole = [
  { label: "branchUser", value: "branchUser" },
  { label: "newUser", value: "newUser" },
  { label: "Guide", value: "Guide" },
];
