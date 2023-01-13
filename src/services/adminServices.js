import Axios from "axios";
import config from "../config.json";

export function UserCount() {
  return Axios.get(`${config.Api}/admin/userCount`);
}

export function Users() {
  return Axios.get(`${config.Api}/admin/users`);
}
