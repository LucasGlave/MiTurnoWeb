"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import Login from "@/components/login/Login";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return <>{user.id ? <Dashboard /> : <Login />}</>;
};

export default page;
