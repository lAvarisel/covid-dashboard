import "../main.scss";
import loadTotalCases from "./loadTotalCases";

export default class App {
  constructor() {
    this.container = document.querySelector("#root");
  }

  init = () => {
    loadTotalCases('https://api.covid19api.com/summary');
  }
}
