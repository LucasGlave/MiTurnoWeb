"use client";
import { userServiceMe } from "@/services/user.service";
import { setUser } from "@/state/user";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoutesProtection = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    userServiceMe()
      .then((user) => {
        if (user) dispatch(setUser(user));
      })
      .catch(() => {});
  }, []);
  return <>{children}</>;
};

export default RoutesProtection;
