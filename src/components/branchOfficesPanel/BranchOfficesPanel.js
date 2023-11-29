import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { getAllBranchOfficeService } from "@/services/branchOffice.service";

const BranchOfficesPanel = () => {
  const [branchOffices, setBranchOffices] = useState([]);

  useEffect(() => {
    getAllBranchOfficeService().then((branchOffices) => {
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
