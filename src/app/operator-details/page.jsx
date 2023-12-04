"use client";
import React from "react";
import OpeDetails from "@/components/operatorDetails/OpeDetails";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

const operatorDetails = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" ||
        user.role_id === "admin" ||
        user.role_id === "operator" ? (
        <OpeDetails />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default operatorDetails;
