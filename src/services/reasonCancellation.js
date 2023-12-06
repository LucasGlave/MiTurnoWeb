import axios from "axios";
axios.defaults.withCredentials = true;

export const reasonCancellationServiceAll = () => {
  return axios
    .get("http://localhost:5001/api/reason-cancellations")
    .then((reasonCancellations) => reasonCancellations.data);
};
