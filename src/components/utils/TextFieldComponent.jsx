import { TextField } from "@mui/material";
import React from "react";

const TextFieldComponent = ({
  proId,
  label,
  name,
  handleChange,
  handleBlur,
  values,
  theme,
  touched,
  desc,
  errors,
  placeholder,
}) => {
  return (
    <>
      <TextField
        fullWidth
        autoComplete="off"
        variant="outlined"
        disabled={proId ? true : false}
        type="text"
        label={label}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values || ""}
        rows={desc ? 3 : 1}
        multiline
        error={!!touched && !!errors}
        helperText={touched && errors}
      />
    </>
  );
};

export default TextFieldComponent;
