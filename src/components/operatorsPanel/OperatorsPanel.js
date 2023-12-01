import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { userServiceGetAllOperators } from "@/services/user.service";
import { setElements } from "@/state/elements";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const OperatorsPanel = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    userServiceGetAllOperators().then((operatorsResult) => {
      dispatch(setElements(operatorsResult.data));
    });
  }, []);

  const onExecute = (id) => {
    //navigate.push(/branch-office-details/${id});
  };

  return (
    <Table
      type="AdminOperators"
      color={"operators-panel"}
      onExecute={onExecute}
    />
  );
};

export default OperatorsPanel;
