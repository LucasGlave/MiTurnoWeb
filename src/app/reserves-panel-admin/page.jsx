"use client";
import React from "react";
import ReservesPanelAdmin from "@/components/reservesPanelAdmin/ReservesPanelAdmin";
import Login from "@/components/login/Login";
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
        <ReservesPanelAdmin />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
};

export default page;
