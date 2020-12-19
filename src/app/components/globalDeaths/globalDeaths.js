import LoadingAnimation from "../loading/loading";
import DataBase from "../dataBase/dataBase";
import CreateDomElement from "../../utils";
import "./globalDeaths.scss";

export default class GlobalDeaths {
  async init() {
    const dataBase = new DataBase();
    const loadingAnimate = new LoadingAnimation();
    const select = document.querySelector("#globalDeaths_select");
    const module = document.querySelector(".globalDeaths");
    dataBase.init();
    document
      .querySelector(".globalDeaths")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    this.summary = await dataBase.getSummaryFromApi();
    GlobalDeaths.generateTableGlobalDeath(this.summary);
    loadingAnimate.stopAnimate();
    select.addEventListener("change", () => {
      if (select.value === "Global Deaths") {
        GlobalDeaths.generateTableGlobalDeath(this.summary, "Global Deaths");
      } else {
        GlobalDeaths.generateTableGlobalDeath(this.summary, "Global Recovered");
      }
    });
    module.addEventListener("click", (event) => {
      const targetRow = event.target.closest("tr");
      const currentActive = document.querySelector(".globalDeaths_row--active");
      if (currentActive !== null) {
        currentActive.classList.remove("globalDeaths_row--active");
      }
      if (targetRow.classList.contains("globalDeaths_row--active")) {
        event.target.closest("tr").classList.remove("globalDeaths_row--active");
      } else {
        event.target.closest("tr").classList.add("globalDeaths_row--active");
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
      cellCount.classList.add("globalDeaths_cell--recovered");
    } else {
      countNumb = country.TotalDeaths.toString().replace(
        /(\d)(?=(\d\d\d)+([^\d]|$))/g,
        "$1 "
      );
      cellCount.append(`${countNumb} deaths`);
      cellCount.classList.remove("globalDeaths_cell--recovered");
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
