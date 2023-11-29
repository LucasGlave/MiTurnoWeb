import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { branchOfficeServiceAll } from "@/services/branchOffice.service";


const BranchOfficesPanel = () => {
  const [branchOffices, setBranchOffices] = useState([]);

  useEffect(() => {
    branchOfficeServiceAll().then((branchOffices) => {
      setBranchOffices(branchOffices.data);
    });
  }, []);
  return (
    <Table
      color={"branch-office"}
      type="AdminBranchOffices"
      elements={branchOffices}
    />
  );
};

export default BranchOfficesPanel;
