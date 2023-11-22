"use client";
import axios from "axios";
import { useEffect } from "react";
import Reserve from "@/components/reserve/Reserve";
import Login from "@/components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/state/user";
// import { user } from "@/state/user";

export default function Home() {
  const user = useSelector((state) => state.user);
  return <>{user.fullName ? <Reserve /> : <Login />}</>;
}
