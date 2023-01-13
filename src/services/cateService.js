import Axios from "axios";
import config from "../config.json";

export function cates() {
  return Axios.get(`${config.Api}/expenseCategory/`);
}

export function Create(Cate) {
  return Axios.post(`${config.Api}/expenseCategory/create`, Cate);
}
export function getCate(id) {
  return Axios.get(`${config.Api}/expenseCategory/update/${id}`);
}
export function updateCate(cate, id) {
  return Axios.post(`${config.Api}/expenseCategory/update/${id}`, cate);
}
export function Remove(id) {
  return Axios.post(`${config.Api}/expenseCategory/remove/${id}`);
}
