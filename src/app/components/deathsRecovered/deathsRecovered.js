import LoadingAnimation from "../loading/loading";
import DataBase from "../dataBase/dataBase";
import CreateDomElement from "../../utils";
import "./deathsRecovered.scss";

export default class DeathsRecovered {
  async init() {
    const loadingAnimate = new LoadingAnimation();
    document
      .querySelector(".deathsRecovered")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    const summary = await DataBase.getDataFromApi("summary");
    DeathsRecovered.createTable(summary);
    loadingAnimate.stopAnimate();
    document
      .querySelector(".deathsRecovered_btn--fullscreen")
      .addEventListener("click", () => {
        document
          .querySelector(".deathsRecovered")
          .classList.toggle("window--fullSize");
      });
    return this;
  }

  static createTable(summary) {
    const table = document.querySelector(".deathsRecovered_table");
    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
    const arrData = Array.from(summary.Countries);
    arrData.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
    arrData.forEach((country) => {
      table.append(DeathsRecovered.createRow(country));
    });
  }

  static createRow(country) {
    const newRow = CreateDomElement("tr", "deathsRecovered_row");
    const cell = CreateDomElement("td", "deathsRecovered_cell");
    const cellCountDeath = CreateDomElement("p", "deathsRecovered_death");
    const cellCountryRecovered = CreateDomElement(
      "p",
      "deathsRecovered_recovered"
    );
    const cellCountry = CreateDomElement("p", "deathsRecovered_country");
    cellCountDeath.append(
      `${DeathsRecovered.formatNumber(country.TotalDeaths)} deaths`
    );
    cellCountryRecovered.append(
      `${DeathsRecovered.formatNumber(country.TotalRecovered)} recovered`
    );
    cellCountry.append(`${DeathsRecovered.formatNumber(country.Country)}`);
    cell.append(cellCountDeath);
    cell.append(cellCountryRecovered);
    cell.append(cellCountry);
    newRow.append(cell);
    return newRow;
  }

  static formatNumber(numb) {
    return numb.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
}
