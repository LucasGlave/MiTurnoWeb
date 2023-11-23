"use client";
import Login from "@/components/login/Login";
import Reserve from "@/components/reserve/Reserve";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const reserve = () => {
  const user = useSelector((state) => state.user);

  return <>{user.fullName ? <Reserve /> : <Login />}</>;
};

export default reserve;
