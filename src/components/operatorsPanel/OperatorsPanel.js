import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { userServiceGetAllOperators } from "@/services/user.service";

const OperatorsPanel = () => {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    userServiceGetAllOperators().then((operatorsResult) => {
      setOperators(operatorsResult.data);
    });
  }, []);

  return (
    <Table
      type="AdminOperators"
      elements={operators}
      color={"operators-panel"}
    />
  );
};

export default OperatorsPanel;
