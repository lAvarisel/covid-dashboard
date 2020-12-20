import LoadingAnimation from "../loading/loading";
import DataBase from "../dataBase/dataBase";
import CreateDomElement from "../../utils";
import "./globalDeaths.scss";

export default class GlobalDeaths {
  async init() {
    const loadingAnimate = new LoadingAnimation();
    const select = document.querySelector("#globalDeaths_select");
    const table = document.querySelector(".globalDeaths_table");
    let activeCountry = "all";
    let fullTableType = "all";
    document
      .querySelector(".globalDeaths")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    const summary = await DataBase.getDataFromApi("summary");
    GlobalDeaths.generateTableGlobalDeath(
      summary,
      "Global Deaths",
      "all",
      fullTableType
    );
    loadingAnimate.stopAnimate();
    select.addEventListener("change", () => {
      if (select.value === "Global Deaths") {
        if (document.querySelector(".globalDeaths_row--active") !== null) {
          fullTableType = "Global Recovered";
        } else if (
          document.querySelectorAll(".globalDeaths_row").length === 1
        ) {
          fullTableType = "all";
        } else {
          activeCountry = "all";
          fullTableType = "all";
        }
        GlobalDeaths.generateTableGlobalDeath(
          summary,
          "Global Deaths",
          activeCountry,
          fullTableType
        );
      } else {
        if (document.querySelector(".globalDeaths_row--active") !== null) {
          fullTableType = "Global Deaths";
        } else if (
          document.querySelectorAll(".globalDeaths_row").length === 1
        ) {
          fullTableType = "all";
        } else {
          activeCountry = "all";
          fullTableType = "all";
        }
        GlobalDeaths.generateTableGlobalDeath(
          summary,
          "Global Recovered",
          activeCountry,
          fullTableType
        );
      }
    });
    table.addEventListener("click", (event) => {
      const targetRow = event.target.closest("tr");
      const currentActive = document.querySelector(".globalDeaths_row--active");
      let targetCountryCount = targetRow.querySelector(
        ".globalDeaths_cell--count"
      ).textContent;
      targetCountryCount = parseInt(
        targetCountryCount.replace(/[^\d]/g, ""),
        10
      );
      if (currentActive !== null) {
        if (targetRow.classList.contains("globalDeaths_row--active")) {
          currentActive.classList.remove("globalDeaths_row--active");
          GlobalDeaths.updateTotalCount(select, summary);
        } else {
          currentActive.classList.remove("globalDeaths_row--active");
          targetRow.classList.add("globalDeaths_row--active");
          activeCountry = targetRow.querySelector(".globalDeaths_cell--country")
            .textContent;
          GlobalDeaths.setCount(targetCountryCount);
        }
      } else {
        targetRow.classList.add("globalDeaths_row--active");
        activeCountry = targetRow.querySelector(".globalDeaths_cell--country")
          .textContent;
        GlobalDeaths.setCount(targetCountryCount);
      }
    });
    return this;
  }

  static updateTotalCount(select, summary) {
    if (select.value === "Global Deaths") {
      GlobalDeaths.setCount(summary.Global.TotalDeaths);
    } else {
      GlobalDeaths.setCount(summary.Global.TotalRecovered);
    }
  }

  static generateTableGlobalDeath(summary, type, targetCountry, optionsTable) {
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
      table.append(
        GlobalDeaths.createRow(country, type, targetCountry, optionsTable)
      );
    });
  }

  static createRow(countrys, type, targetCountry, optionsTable) {
    let newRow = CreateDomElement("tr", "globalDeaths_row");
    const cellCount = CreateDomElement("td", "globalDeaths_cell");
    const cellCountry = CreateDomElement("td", "globalDeaths_cell");
    cellCount.classList.add("globalDeaths_cell--count");
    cellCountry.classList.add("globalDeaths_cell--country");
    let countNumb = "";
    if (type === "Global Recovered") {
      countNumb = countrys.TotalRecovered.toString().replace(
        /(\d)(?=(\d\d\d)+([^\d]|$))/g,
        "$1 "
      );
      cellCount.append(`${countNumb} recovered`);
      cellCount.classList.add("globalDeaths_cell--recovered");
    } else {
      countNumb = countrys.TotalDeaths.toString().replace(
        /(\d)(?=(\d\d\d)+([^\d]|$))/g,
        "$1 "
      );
      cellCount.append(`${countNumb} deaths`);
      cellCount.classList.remove("globalDeaths_cell--recovered");
    }
    if (
      targetCountry === "all" ||
      targetCountry === countrys.Country ||
      optionsTable === "all"
    ) {
      if (targetCountry === countrys.Country && optionsTable === "all") {
        newRow.classList.add("globalDeaths_row--active");
      }
      if (targetCountry === countrys.Country) {
        GlobalDeaths.setCount(countNumb);
      }
      cellCountry.append(countrys.Country);
      newRow.append(cellCount);
      newRow.append(cellCountry);
    } else {
      newRow = "";
    }
    return newRow;
  }

  static setCount(count) {
    const totalCount = count
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    document.querySelector("#globalDeaths_count").textContent = totalCount;
  }
}
