"use client";
import React from "react";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";
import CreateBranch from "@/components/createBranch/CreateBranch";

const createBranch = () => {
  const user = useSelector((state) => state.user);

  return <>{user.id ? <CreateBranch /> : <Login />}</>;
};

export default createBranch;
