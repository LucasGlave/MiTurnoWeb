"use client";
import { setUser } from "@/state/user";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoutesProtection = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/users/me`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((User) => {
        if (User) dispatch(setUser(User));
      })
      .catch((err) => console.error(err));
  }, []);
  return <>{children}</>;
};

export default RoutesProtection;
