import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { branchOfficeServiceAll } from "@/services/branchOffice.service";
import { setElements } from "@/state/elements";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const BranchOfficesPanel = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    branchOfficeServiceAll().then((branchOffices) => {
      dispatch(setElements(branchOffices.data));
    });
  }, []);

  const onExecute = (id) => {
    navigate.push(`/branch-office-details/${id}`);
  };

  return (
    <Table
      color={"branch-office"}
      type="AdminBranchOffices"
      onExecute={onExecute}
    />
  );
};

export default BranchOfficesPanel;
