import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TextFieldComponent from "../utils/TextFieldComponent";
import { useDispatch } from "react-redux";
import { loginAPI } from "../redux/reducers/loginSlice";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const passwordHideShow = () => {
    setShow(!show);
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const checkoutSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required*"),
    password: yup.string().required("Required*"),
  });
  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await dispatch(loginAPI(data));
    if (response.payload) {
      if (response.payload.success === "false") {
        Swal.fire({
          title: "Login failed!",
          text: `${response.payload.message}`,
          icon: "error",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else {
        await localStorage.setItem("paryatan", response.payload.token);
        Swal.fire({
          title: "Login Successfully!",
          text: "Welcome to Paryatane!",
          icon: "success",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Dashboard");
          }
        });
      }
    }
  };

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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2em",
                  p: 1,
                  position: "sticky",
                  top: "2.7em",
                  bottom: "2em",
                  zIndex: 99,
                  bgcolor: "white",
                  marginBottom: "2em",
                }}
              >
                <Typography variant="h4" sx={{ color: "#073E9A", fontFamily: "serif", fontSize: "1.5em" }}>Welcome to Paryatane</Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  boxShadow: "0px 0px 16px 11px rgba(169, 169, 169, 0.27)",
                  borderRadius: "3%",
                  width: "450px",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    marginTop: "22px",
                    width: "380px",
                    height: "35px",
                  }}
                >
                  <InputLabel style={{ marginBottom: "0.5em" }}  >Email*</InputLabel>
                  <TextFieldComponent
                    name="email"
                    placeholder={"you@gmail.com"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values.email}
                    errors={errors.email}
                    touched={touched.email}
                    style={{ borderColor: "blue" }}
                  />
                </div>
                <div
                  style={{
                    width: "380px",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "3em",
                    flexDirection: "column",
                  }}
                >
                  <InputLabel
                    style={{ marginRight: "19em", marginTop: "1em" }}
                  >
                    Password*
                  </InputLabel>
                  <TextField
                    margin="dense"
                    fullWidth
                    name="password"
                    autoComplete="on"
                    type={show ? "text" : "password"}
                    id="password"
                    placeholder="your password"
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
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    style={{
                      background: "#073E9A",
                      width: "150px",
                      marginLeft: "22px",
                    }}
                  >
                    Log in
                  </Button>

                  <Typography
                    variant="subtitle1"
                    p={1}
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => navigate("/SignUp")}
                  >
                    New? SignUp here!
                  </Typography>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default Login;
