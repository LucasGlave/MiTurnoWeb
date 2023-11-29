import axios from "axios";

export const getAllBranchOfficesService = () => {
  return axios.get("http://localhost:5001/api/branch-offices/");
};
