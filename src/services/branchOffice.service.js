import axios from "axios";

export const getAllBranchOfficeService = () => {
  return axios.get("http://localhost:5001/api/branch-offices/all");
};
