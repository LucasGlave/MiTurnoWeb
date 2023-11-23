import axios from "axios";

export const reserveServiceGetAllBranchOffices = () => {
  return axios.get("http://localhost:5001/api/branch-offices/all");
};
