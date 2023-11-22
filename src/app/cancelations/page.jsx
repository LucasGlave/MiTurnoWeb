"use client";
import Cancelations from "@/components/cancelations/Cancelations";
import Login from "@/components/login/Login";
import React from "react";
import { useSelector } from "react-redux";

function cancelations() {
  const user = useSelector((state) => state.user);
  return <>{user.fullName ? <Cancelations /> : <Login />}</>;
}

export default cancelations;
