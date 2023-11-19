"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../app/general.module.scss";
import Reserve from "@/components/reserve/Reserve";
import Link from "next/link";
import Login from "@/components/login/Login";

export default function Home() {
  const navigate = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/users/me`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((user) => {
        if (user) setUser(user);
        console.log(user);
      });
  }, []);

  return <>{user.fullName ? <Reserve /> : <Login />}</>;
}
