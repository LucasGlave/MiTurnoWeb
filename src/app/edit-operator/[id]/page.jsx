"use client";
import React from "react";
import Login from "@/components/login/Login";
import EditOperator from "@/components/editOperator/EditOperator";
import { useSelector } from "react-redux";

const editOperator = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <EditOperator />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default editOperator;
