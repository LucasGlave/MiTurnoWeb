"use client";
import Reserve from "@/components/reserve/Reserve";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user);
  return <>{user.full_name ? <Reserve /> : <Login />}</>;
}
