import React from "react";
import Login from "../components/auth/login";

export const metadata = {
    title: "ACIF Login",
    description: "Login to your ACIF Account",
  };
function index(props) {
  return <Login />;
}

export default index;
