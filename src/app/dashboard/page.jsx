"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import Login from "@/components/login/Login";
import Reserve from "@/components/reserve/Reserve";
import ReservesPanelOperator from "@/components/reservesPanelOperator/ReservesPanelOperator";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" || user.role_id === "admin" ? (
        <Dashboard />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default page;
