import {
  Box,
  Button,
  Grid,
  InputLabel,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import TextFieldComponent from "../utils/TextFieldComponent";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createCompanyData } from "../redux/reducers/companySlice";
import DropzoneExample from "../utils/DropZoneImage";
import Swal from "sweetalert2";
const AddCompany = () => {
  const dispatch = useDispatch();
  const [companylogo, setCompanyLogo] = useState();
  const navigate = useNavigate();
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
    name: "",
    address: "",
    website: "",
    location_link: "",
    about_text: "",
  };
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required*"),
    address: yup.string().required("Required*"),
    website: yup.string().required("Required*"),
    location_link: yup.string().required("Required*"),
    about_text: yup.string().required("Required*"),
  });
  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      name: values.name,
      address: values.address,
      website: values.website,
      location_link: values.location_link,
      about_text: values.about_text,
    };
    let formdata = new FormData();
    formdata.append("json", JSON.stringify(data));
    if (Array.isArray(companylogo) && companylogo.length > 0)
      formdata.append("img_link", companylogo[0]);
    console.log("data===>", data);
    console.log("formdata===>", formdata);
    const response = await dispatch(createCompanyData(formdata));
    if (response.payload) {
      Swal.fire({
        title: "Company Data Added Succesfully!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/CompanyManagement");
        }
      });
    }
  };

  const handleback = () => {
    navigate(-1);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
            <Typography variant="h6">Add New Company</Typography>
            <Grid container spacing={5} p="20px">
              <Grid item xs={6}>
                <InputLabel>Company Name</InputLabel>
                <TextFieldComponent
                  name="name"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values.name}
                  errors={errors.name}
                  touched={touched.name}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Address</InputLabel>
                <TextFieldComponent
                  name="address"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values.address}
                  errors={errors.address}
                  touched={touched.address}
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel>Website</InputLabel>
                <TextFieldComponent
                  name="website"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values.website}
                  errors={errors.website}
                  touched={touched.website}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Location Link</InputLabel>
                <TextFieldComponent
                  name="location_link"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values.location_link}
                  errors={errors.location_link}
                  touched={touched.location_link}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>About Text</InputLabel>
                <TextFieldComponent
                  desc={2}
                  name="about_text"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values.about_text}
                  errors={errors.about_text}
                  touched={touched.about_text}
                />
              </Grid>
              <Grid item xs={6}>
                <DropzoneExample
                  content={"Company Logo"}
                  setlocationimage={setCompanyLogo}
                />
              </Grid>
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
    </>
  );
};

export default AddCompany;
