import axios from "axios";

export const horaryServiceAll = () => {
  return axios.get("http://localhost:5001/api/horaries");
};

export const horaryServiceByDate = (date, branchOfficeId) => {
  return axios.get(
    `http://localhost:5001/api/horaries/${date}/${branchOfficeId}`
  );
};
