import {
    Autocomplete,
    Box,
    Button,
    Grid,
    InputLabel,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import TextFieldComponent from "../utils/TextFieldComponent";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CompanyDropDownComponent from "../utils/CompanyDropDownComponent";
import { getAllCompanyList, getCompanyList } from "../redux/reducers/userSlice";

const UpdateBranch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [compList, setCompList] = useState(null);
    const companyList = useSelector(getCompanyList);
    console.log("companyList===>", companyList);
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
        branch_name: "",
        branch_address: "",
        branch_details: "",
        branch_email_id: "",
        comapany_id: "",
    };
    const checkoutSchema = yup.object().shape({
        branch_name: yup.string().required("Required*"),
        branch_address: yup.string().required("Required*"),
        branch_details: yup.string().required("Required*"),
        branch_email_id: yup.string().email("enter the correct email").required("Required*"),
    });
    const handleFormSubmit = async (values, { resetForm }) => {
        const data = {
            branch_name: values.branch_name,
            branch_address: values.branch_address,
            branch_details: values.branch_details,
            branch_email_id: values.branch_email_id,
            comapany_id: compList.id,
        };

        console.log("data===>", data);
        // const response = await dispatch(createBranchData(data));
        // if (response.payload) {
        //     Swal.fire({
        //         title: "Branch Added Succesfully!",
        //         icon: "success",
        //         showConfirmButton: true,
        //         allowOutsideClick: false,
        //         allowEscapeKey: false,
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             navigate("/BranchManagement");
        //         }
        //     });
        // }
    };
    useEffect(() => {
        dispatch(getAllCompanyList());
    }, [dispatch])
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
                        <Typography variant="h6">Update Branch</Typography>
                        <Grid container spacing={5} p="20px">
                            <Grid item xs={6}>
                                <InputLabel>Branch Name</InputLabel>
                                <TextFieldComponent
                                    name="branch_name"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values.branch_name}
                                    errors={errors.branch_name}
                                    touched={touched.branch_name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Branch Address</InputLabel>
                                <TextFieldComponent
                                    name="branch_address"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values.branch_address}
                                    errors={errors.branch_address}
                                    touched={touched.branch_address}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel>Branch Details</InputLabel>
                                <TextFieldComponent
                                    name="branch_details"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values.branch_details}
                                    errors={errors.branch_details}
                                    touched={touched.branch_details}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Branch Email-ID</InputLabel>
                                <TextFieldComponent
                                    name="branch_email_id"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values.branch_email_id}
                                    errors={errors.branch_email_id}
                                    touched={touched.branch_email_id}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CompanyDropDownComponent
                                    label={"select the company"}
                                    name={"company_name"}
                                    options={companyList}
                                    stateData={compList}
                                    setStateData={setCompList}
                                    inputerror={"please select the company"}
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
            </Formik >
        </>
    )
}

export default UpdateBranch
