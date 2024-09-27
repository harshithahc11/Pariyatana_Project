import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

const useauth = () => {
  const token = localStorage.getItem("paryatan");
  if (!token) {
    return <Navigate to="/" />;
  }
  if (token) {
    try {
      const decode = jwtDecode(token);
      console.log("token===>", decode);
      const {
        id,
        name,
        phone,
        email,
        password,
        role_name,
        company_id,
        role_id,
        branch_id,
      } = decode;
      return {
        id,
        name,
        email,
        password,
        phone,
        role_name,
        company_id,
        role_id,
        branch_id,
        token,
      };
    } catch (error) {
      console.error("error decoding token:", error);
    }
  }
};

export default useauth;
