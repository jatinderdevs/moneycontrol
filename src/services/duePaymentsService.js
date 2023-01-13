import Axios from "axios";
import config from "../config.json";

export function Create(data) {
  return Axios.post(`${config.Api}/duepayment/create`, data);
}
export function dueTotal() {
  return Axios.get(`${config.Api}/duepayment/totalDuePayements`);
}
export function duePayments() {
  return Axios.get(`${config.Api}/duepayment`);
}
export function isDone(id) {
  return Axios.post(`${config.Api}/duepayment/isdone`, { id });
}
export function Remove(id) {
  return Axios.post(`${config.Api}/duepayment/remove`, { id });
}
