"use client";
import Reserve from "@/components/reserve/Reserve";
import Login from "@/components/login/Login";
import { useSelector } from "react-redux";
import BranchOfficesPanel from "@/components/branchOfficesPanel/BranchOfficesPanel";
import ReservesPanelOperator from "@/components/reservesPanelOperator/ReservesPanelOperator";

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {!user.id ? (
        <Login />
      ) : user.role_id === "super admin" ? (
        <BranchOfficesPanel />
      ) : user.role_id === "operator" ? (
        <ReservesPanelOperator />
      ) : (
        <Reserve />
      )}
    </>
  );
}
