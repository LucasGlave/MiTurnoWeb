"use client";
import React from "react";
import Login from "@/components/login/Login";
import CreateOperators from "@/components/createOperators/CreateOperators";
import { useSelector } from "react-redux";

const createOperators = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <CreateOperators />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default createOperators;
