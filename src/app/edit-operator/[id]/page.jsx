"use client";
import React from "react";
import Login from "@/components/login/Login";
import EditOperator from "@/components/editOperator/EditOperator";
import { useSelector } from "react-redux";

const editOperator = () => {
  const user = useSelector((state) => state.user);
  return <>{user.id ? <EditOperator /> : <Login />}</>;
};

export default editOperator;