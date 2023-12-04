"use client";

import React from "react";
import AdmDetails from "@/components/admDetails/AdmDetails";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

const admDetails = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <AdmDetails />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default admDetails;
