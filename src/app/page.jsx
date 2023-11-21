"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Reserve from "@/components/reserve/Reserve";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";

export default function Home() {
  const navigate = useRouter();
  const user = useSelector((state) => state.user);

  return <>{user.fullName ? <Reserve /> : <Login />}</>;
}
