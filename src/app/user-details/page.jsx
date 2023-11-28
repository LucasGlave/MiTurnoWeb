"use client";

import React from "react";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";
import UserDetails from "@/components/userDetails/UserDetails";

const userDetails = () => {
  const user = useSelector((state) => state.user);

  return <>{user.full_name ? <UserDetails /> : <Login />}</>;
};

export default userDetails;
