import Axios from "axios";
import config from "../config.json";

export function updatePassword(oldpassword, newpassword) {
  const passwords = {
    oldpassword: oldpassword,
    newpassword: newpassword,
  };
  return Axios.post(`${config.Api}/user/changepassword`, passwords);
}
