import "../main.scss";
import GlobalCases from "./components/globalCases/globalCases";
import AppData from "./components/dataBase/dataBase";
import CasesByCountry from "./components/casesByCountry/casesByCountry";
import GlobalDeaths from "./components/globalDeaths/globalDeaths";
import Map from "./components/map/map";
import Shedule from "./components/schedule/schedule";

export default class App {
  constructor() {
    this.container = document.querySelector("#root");
  }

  init() {
    const appData = new AppData();
    const globalCases = new GlobalCases();
    const casesByCountry = new CasesByCountry();
    const globalDeaths = new GlobalDeaths();
    const map = new Map();
    const shedule = new Shedule();
    appData.init();
    globalCases.init();
    casesByCountry.init();
    globalDeaths.init();
    map.init();
    shedule.init();
    return this;
  }
}
