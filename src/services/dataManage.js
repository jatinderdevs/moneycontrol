import Axios from "axios";
import config from "../config.json";

export function catewithTotal() {
  return Axios.get(`${config.Api}/catetotal/`);
}

export function earnTotal() {
  return Axios.get(`${config.Api}/totalearning`);
}

export function chartData() {
  return Axios.get(`${config.Api}/chartdata`);
}

export function totalofthismonth() {
  return Axios.get(`${config.Api}/totalreport`);
}

export function getStatement(dates) {
  return Axios.post(`${config.Api}/statemet`, dates);
}

export const downloadXLSFile = async (data) => {

  try {
    const response = await Axios.post(`${config.Api}/statemet`, data, {
      responseType: "arraybuffer",
    });

    const outputFilename = `${Date.now()}.xlsx`;

    // If you want to download file automatically using link attribute.
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // OR you can save/write file locally.
  } catch (error) {
    console.log(error);
    //throw Error(error);
  }
};
