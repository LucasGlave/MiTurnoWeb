import React, { useEffect } from "react";
import Table from "../../commons/Table";
import { useParams } from "next/navigation";
import { turnServiceGetByConfirmationAndUser } from "@/services/turn.service";
import { useDispatch } from "react-redux";
import { setElements } from "@/state/elements";
import { useRouter } from "next/navigation";

const ReservesPanelClient = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    turnServiceGetByConfirmationAndUser(id).then((turns) => {
      dispatch(setElements(turns));
    });
  }, []);

  const onExecute = (id) => {
    navigate.push(`/cancelations/${id}`);
  };

  return (
    <Table
      type="ClientReserves"
      onExecute={onExecute}
      color={"reserve-panel"}
    />
  );
};

export default ReservesPanelClient;
