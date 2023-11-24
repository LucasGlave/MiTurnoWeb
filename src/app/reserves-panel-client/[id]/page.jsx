"use client";
import Login from "@/components/login/Login";
import ReservesPanelClient from "@/components/reservesPanelClient/ReservesPanelClient";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return <>{user.fullName ? <ReservesPanelClient /> : <Login />}</>;
};

export default page;
