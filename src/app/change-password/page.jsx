"use client";

import React from "react";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";
import ChangePassword from "@/components/changePassword/ChangePassword";

const changePassword = () => {
  const user = useSelector((state) => state.user);
  return <>{user.id ? <ChangePassword /> : <Login />}</>;
};

export default changePassword;
