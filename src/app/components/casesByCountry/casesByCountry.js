import LoadingAnimation from "../loading/loading";
import DataBase from "../dataBase/dataBase";
import GlobalDeaths from "../globalDeaths/globalDeaths";
import CreateDomElement from "../../utils";
import "./casesByCountry.scss";

export default class CasesByCountry {
  async init() {
    const loadingAnimate = new LoadingAnimation();
    const table = document.querySelector(".casesByCountry");
    const select = document.querySelector("#globalDeaths_select");
    document
      .querySelector(".casesByCountry")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    const summary = await DataBase.getDataFromApi("summary");
    CasesByCountry.generateTable(summary);
    table.addEventListener("click", (event) => {
      const targetRow = event.target.closest("tr");
      const targetCount = targetRow.querySelector(".casesByCountry_count")
        .textContent;
      const targetCountry = targetRow.querySelector(".casesByCountry_country")
        .textContent;
      const currentActive = document.querySelector(
        ".casesByCountry_row--active"
      );
      if (currentActive !== null) {
        if (targetRow.classList.contains("casesByCountry_row--active")) {
          currentActive.classList.remove("casesByCountry_row--active");
          CasesByCountry.updateGlobalCases(summary.Global.TotalConfirmed);
          GlobalDeaths.generateTableGlobalDeath(
            summary,
            select.value,
            "all",
            "all"
          );
        } else {
          currentActive.classList.remove("casesByCountry_row--active");
          targetRow.classList.add("casesByCountry_row--active");
          CasesByCountry.updateGlobalCases(targetCount);
          GlobalDeaths.generateTableGlobalDeath(
            summary,
            select.value,
            targetCountry
          );
        }
      } else {
        targetRow.classList.add("casesByCountry_row--active");
        CasesByCountry.updateGlobalCases(targetCount);
        GlobalDeaths.generateTableGlobalDeath(
          summary,
          select.value,
          targetCountry
        );
      }
    });
    loadingAnimate.stopAnimate();
    return this;
  }

  static generateTable(summary) {
    const table = document.querySelector(".casesByCountry_table");
    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
    const arrData = Array.from(summary.Countries);
    arrData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    arrData.forEach((country) => {
      table.append(CasesByCountry.createRow(country));
    });
  }

  static createRow(country) {
    const newRow = CreateDomElement("tr", "casesByCountry_row");
    const cell = CreateDomElement("td", "casesByCountry_cell");
    const count = CreateDomElement("span", "casesByCountry_count");
    const cellCountry = CreateDomElement("span", "casesByCountry_country");
    const countNumb = country.TotalConfirmed.toString().replace(
      /(\d)(?=(\d\d\d)+([^\d]|$))/g,
      "$1 "
    );
    count.textContent = countNumb;
    cellCountry.textContent = country.Country;
    cell.append(count);
    cell.append(cellCountry);
    newRow.append(cell);
    return newRow;
  }

  static updateGlobalCases(count) {
    const totalCount = count
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    document.querySelector("#globalCases_count").textContent = totalCount;
  }
}
