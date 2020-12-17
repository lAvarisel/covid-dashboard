import "../main.scss";
import GlobalCases from "./components/globalCases/globalCases";
import AppData from "./components/dataBase/dataBase";

export default class App {
  // state = "";

  constructor() {
    this.container = document.querySelector("#root");
  }

  init() {
    const appData = new AppData();
    appData.init();
    const globalCases = new GlobalCases();
    globalCases.init();
    this.state = "init";
  }
}
