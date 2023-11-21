"use client";

import React from "react";
import OpeDetails from "@/components/operatorDetails/OpeDetails";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

const operatorDetails = () => {
  const user = useSelector((state) => state.user);

  return <>{user.fullName ? <OpeDetails /> : <Login />}</>;
};

export default operatorDetails;
