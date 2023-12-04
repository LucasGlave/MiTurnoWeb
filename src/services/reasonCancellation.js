import axios from "axios";

export const reasonCancellationServiceAll = () => {
  return axios.get("http://localhost:5001/api/reason-cancellations")
  .then((reasonCancellations)=>reasonCancellations.data)
};