"use client";
import Login from "@/components/login/Login";
import BranchOfficesDetails from "@/components/branchOfficeDetails/BranchOfficeDetails";
import React from "react";
import { useSelector } from "react-redux";
import ReservesPanelOperator from "@/components/reservesPanelOperator/ReservesPanelOperator";
import Reserve from "@/components/reserve/Reserve";

const page = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <BranchOfficesDetails />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};
export default page;
