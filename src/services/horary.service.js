import axios from "axios";
axios.defaults.withCredentials = true;

export const horaryServiceAll = () => {
  return axios.get("http://localhost:5001/api/horaries");
};

export const horaryServiceByDate = (date, branchOfficeId) => {
  return axios.get(
    `http://localhost:5001/api/horaries/${date}/${branchOfficeId}`
  );
};
