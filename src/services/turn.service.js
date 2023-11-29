"use client";
import axios from "axios";

export const turnServiceGetByConfirmationAndBranchOffice = (
  branch_office_id
) => {
  return axios
    .get(
      `http://localhost:5001/api/turns/by-confirmation-and-branch-office/${"pending"}/${branch_office_id}`
    )
    .then((turns) => turns.data);
};
