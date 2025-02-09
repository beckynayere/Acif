import React from "react";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
export const metadata = {
  title: "ACIF Signup",
  description: "Create your ACIF Account",
};
function index(props: any) {
  return <Signup />;
}

export default index;
