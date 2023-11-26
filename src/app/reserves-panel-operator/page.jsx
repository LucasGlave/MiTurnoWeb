"use client";
import Login from "@/components/login/Login";
import ReservesPanelOperator from "@/components/reservesPanelOperator/ReservesPanelOperator";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return <>{user.fullName ? <ReservesPanelOperator /> : <Login />}</>;
};

export default page;