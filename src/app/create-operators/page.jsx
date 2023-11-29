"use client";
import React from "react";
import Login from "@/components/login/Login";
import CreateOperators from "@/components/createOperators/CreateOperators";
import { useSelector } from "react-redux";

const createOperators = () => {
  const user = useSelector((state) => state.user);
  return <>{user.id ? <CreateOperators /> : <Login />}</>;
};

export default createOperators;
