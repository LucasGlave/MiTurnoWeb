"use client";
import Login from "@/components/login/Login";
import OperatorsPanel from "@/components/operatorsPanel/OperatorsPanel";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" ||
        user.role_id === "admin" ||
        user.role_id === "operator" ? (
        <OperatorsPanel />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default page;
