"use client";
import Login from "@/components/login/Login";
import BranchOfficesDetails from "@/components/branchOfficeDetails/BranchOfficeDetails";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user);

  return <>{user.id ? <BranchOfficesDetails /> : <Login />}</>;
};
export default page;
