"use client";
import { userServiceMe } from "@/services/user.service";
import { setUser } from "@/state/user";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoutesProtection = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    userServiceMe()
      .then((User) => {
        if (User) dispatch(setUser(User));
      })
      .catch(() => {});
  }, []);
  return <>{children}</>;
};

export default RoutesProtection;
