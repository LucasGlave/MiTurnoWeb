"use client";
import Login from "@/components/login/Login";
import ReservePanel from "@/components/reservePanel/ReservePanel";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return <>{user.fullName ? <ReservePanel /> : <Login />}</>;
};

export default page;
