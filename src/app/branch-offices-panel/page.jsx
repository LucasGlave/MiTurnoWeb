"use client";
import Login from "@/components/login/Login";
import BranchOfficesPanel from "@/components/branchOfficesPanel/BranchOfficesPanel";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <BranchOfficesPanel />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};
export default page;
