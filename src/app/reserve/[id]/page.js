"use client";
import React from "react";
import ReserveSuccess from "@/components/reserve/ReserveSuccess";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

const id = () => {
  const user = useSelector((state) => state.user);

  return <>{user.full_name ? <ReserveSuccess /> : <Login />}</>;
};

export default id;
