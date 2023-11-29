import React, { useEffect, useState } from "react";
import Table from "../../commons/Table";
import { userServiceGetSingle } from "@/services/user.service";
import { useParams } from "next/navigation";

const ReservesPanelClient = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    userServiceGetSingle(id).then((user) => {
      setUser(user);
      setTurns(user.turns);
    });
  }, []);

  return (
        <Table type="ClientReserves" user={user} elements={turns} />
  );
};

export default ReservesPanelClient;
