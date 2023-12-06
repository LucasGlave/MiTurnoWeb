"use client";
import React from "react";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";
import CreateBranch from "@/components/createBranch/CreateBranch";
import Reserve from "@/components/reserve/Reserve";
import ReservesPanelOperator from "@/components/reservesPanelOperator/ReservesPanelOperator";

const createBranch = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <CreateBranch />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default createBranch;
