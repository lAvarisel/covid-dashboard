import "../main.scss";
import GlobalCases from "./components/globalCases/globalCases";
import AppData from "./components/dataBase/dataBase";
import CasesByCountry from "./components/casesByCountry/casesByCountry";

export default class App {
  constructor() {
    this.container = document.querySelector("#root");
  }

  init() {
    const appData = new AppData();
    const globalCases = new GlobalCases();
    const casesByCountry = new CasesByCountry();
    appData.init();
    globalCases.init();
    casesByCountry.init();
    return this;
  }
}
