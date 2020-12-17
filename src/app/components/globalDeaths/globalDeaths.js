import LoadingAnimation from "../loading/loading";
import DataBase from "../dataBase/dataBase";
import CreateDomElement from "../../utils";
import "./globalDeaths.scss";

export default class GlobalDeaths {
  async init() {
    const dataBase = new DataBase();
    dataBase.init();
    const loadingAnimate = new LoadingAnimation();
    document
      .querySelector(".globalDeaths")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    this.summary = await dataBase.getSummaryFromApi();
    GlobalDeaths.setCount(this.summary.Global.TotalDeaths);
    GlobalDeaths.generateTableGlobalDeath(this.summary);
    loadingAnimate.stopAnimate();
    return this;
  }

  static generateTableGlobalDeath(summary) {
    const table = document.querySelector(".globalDeaths_table");
    summary.Countries.forEach((country) => {
      table.append(GlobalDeaths.createRow(country));
    });
  }

  static createRow(country) {
    const newRow = CreateDomElement("tr", "globalDeaths_row");
    const cellCount = CreateDomElement("td", "globalDeaths_cell");
    const cellCountry = CreateDomElement("td", "globalDeaths_cell");
    cellCount.append(`${country.TotalDeaths} deaths`);
    cellCountry.append(country.Country);
    newRow.append(cellCount);
    newRow.append(cellCountry);
    return newRow;
  }

  static setCount(count) {
    const totalCount = count
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    document.querySelector("#globalDeaths_count").textContent = totalCount;
  }
}
