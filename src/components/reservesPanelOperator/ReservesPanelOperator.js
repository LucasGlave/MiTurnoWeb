import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { turnServiceGetByConfirmationAndBranchOffice } from "@/services/turn.service";
import { useSelector } from "react-redux";

const ReservesPanelOperator = () => {
  const user = useSelector((state) => state.user);
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    turnServiceGetByConfirmationAndBranchOffice(user.branch_office_id).then(
      (turns) => {
        setTurns(turns);
      }
    );
  }, []);

  return (
    <Table type="OperatorReserves" elements={turns} color={"reserve-panel"} />
  );
};

export default ReservesPanelOperator;
