import {
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import TextFieldComponent from "../utils/TextFieldComponent";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { signInAPI } from "../redux/reducers/loginSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const passwordHideShow = () => {
    setShow(!show);
  };
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
    email: "",
    phone: "",
    password: "",
  };
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Required*"),
    email: yup.string().email("enter the correct email").required("Required*"),
    phone: yup.number().required("Required*"),
    password: yup.string().required("Required*"),
  });
  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };
    const response = await dispatch(signInAPI(data));
    if (response.payload) {
      if (response.payload.success === "false") {
        Swal.fire({
          title: "SignUp failed!",
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        Swal.fire({
          title: "SignUp Successfully!",
          icon: "success",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    }
  };
  const handleback = () => {
    navigate(-1)
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
              <Typography
                fontWeight={"bold"}
                color={"#073E9A"}
                fontSize={"2em"}
                textAlign={"center"}
                p={"1"}
              >
                SignUp Here
              </Typography>
              <Grid container spacing={5} p="20px">
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
                  <InputLabel>Phone Number</InputLabel>
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
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    autoComplete="on"
                    type={show ? "text" : "password"}
                    id="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={passwordHideShow} edge="end">
                            {show ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
      </Box>
    </>
  );
};

export default SignUp;
