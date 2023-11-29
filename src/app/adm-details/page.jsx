"use client";

import React from "react";
import AdmDetails from "@/components/admDetails/AdmDetails";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

const admDetails = () => {
  const user = useSelector((state) => state.user);

  return <>{user.full_name ? <AdmDetails /> : <Login />}</>;
};

export default admDetails;
