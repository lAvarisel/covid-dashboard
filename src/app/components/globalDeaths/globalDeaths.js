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
    GlobalDeaths.generateTableGlobalDeath(this.summary);
    loadingAnimate.stopAnimate();
    const select = document.querySelector("#globalDeaths_select");
    select.addEventListener("change", () => {
      if (select.value === "Global Deaths") {
        GlobalDeaths.generateTableGlobalDeath(this.summary, "Global Deaths");
      } else {
        GlobalDeaths.generateTableGlobalDeath(this.summary, "Global Recovered");
      }
    });
    return this;
  }

  static generateTableGlobalDeath(summary, type) {
    const title = document.querySelector(".globalDeaths_title");
    const count = document.querySelector(".globalDeaths_count");
    const table = document.querySelector(".globalDeaths_table");
    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
    const arrData = Array.from(summary.Countries);
    switch (type) {
      case "Global Recovered":
        count.classList.add("globalDeaths_count--recovered");
        title.textContent = "Global Recovered";
        GlobalDeaths.setCount(summary.Global.TotalRecovered);
        arrData.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
        break;

      default:
        count.classList.remove("globalDeaths_count--recovered");
        title.textContent = "Global Deaths";
        GlobalDeaths.setCount(summary.Global.TotalDeaths);
        arrData.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        break;
    }
    arrData.forEach((country) => {
      table.append(GlobalDeaths.createRow(country, type));
    });
  }

  static createRow(country, type) {
    const newRow = CreateDomElement("tr", "globalDeaths_row");
    const cellCount = CreateDomElement("td", "globalDeaths_cell");
    const cellCountry = CreateDomElement("td", "globalDeaths_cell");
    let countNumb = "";
    if (type === "Global Recovered") {
      countNumb = country.TotalRecovered.toString().replace(
        /(\d)(?=(\d\d\d)+([^\d]|$))/g,
        "$1 "
      );
      cellCount.append(`${countNumb} recovered`);
    } else {
      countNumb = country.TotalDeaths.toString().replace(
        /(\d)(?=(\d\d\d)+([^\d]|$))/g,
        "$1 "
      );
      cellCount.append(`${countNumb} deaths`);
    }
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
