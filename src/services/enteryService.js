import Axios from "axios";
import config from "../config.json";

export function enteries(pageSize, page) {
  return Axios.get(`${config.Api}/entery/?pageSize=${pageSize}&page=${page}`);
}

export function Create(entery) {
  return Axios.post(`${config.Api}/entery/create`, entery);
}
export function Edit(id) {
  return Axios.get(`${config.Api}/entery/edit/${id}`);
}
export function Update(entry, id) {
  return Axios.post(`${config.Api}/entery/edit/${id}`, entry);
}
export function Remove(id) {
  return Axios.post(`${config.Api}/entery/remove`, { id });
}
export function search(txt) {
  return Axios.get(`${config.Api}/entery/search?keyword=${txt}`);
}
