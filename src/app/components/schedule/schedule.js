import Chart from "chart.js";
import LoadingAnimation from "../loading/loading";
import "./schedule.scss";
import DataBase from "../dataBase/dataBase";

export default class Schedule {
  async init() {
    const loadingAnimate = new LoadingAnimation();
    document
      .querySelector(".schedule_inner")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    const select = document.querySelector("#schedule_select");
    const summary = await DataBase.getDataFromApi("fullWorld");
    const countries = await DataBase.getDataFromApi("countries");
    const arrData = Array.from(summary.data);
    const arrDataCountries = Array.from(countries);
    Schedule.render(select, arrData, "full");
    document
      .querySelector(".schedule_btn--fullscreen")
      .addEventListener("click", () => {
        document
          .querySelector(".schedule")
          .classList.toggle("window--fullSize");
      });
    document
      .querySelector(".casesByCountry_table")
      .addEventListener("click", (event) => {
        const currentActive = document.querySelector(
          ".casesByCountry_row--active"
        );
        if (currentActive === null || currentActive === undefined) {
          const targetRow = event.target.closest("tr");
          const targetCountry = targetRow.querySelector(
            ".casesByCountry_country"
          ).textContent;
          arrDataCountries.forEach((element) => {
            if (element.Country === targetCountry) {
              Schedule.render(select, arrData, element.ISO2);
            }
          });
        } else {
          Schedule.render(select, arrData, "full");
        }
      });
    select.addEventListener("change", () => {
      const target = document.querySelector(".casesByCountry_row--active");
      if (target !== null && target !== undefined) {
        const targetCountry = target.querySelector(".casesByCountry_country")
          .textContent;
        arrDataCountries.forEach((element) => {
          if (element.Country === targetCountry) {
            Schedule.render(select, arrData, element.ISO2);
          }
        });
      } else {
        Schedule.render(select, arrData, "full");
      }
    });
    loadingAnimate.stopAnimate();
    return this;
  }

  static async getCasesByCountry(country) {
    const cases = await DataBase.getDataFromApi("countryAllCases", country);
    return cases;
  }

  static async render(select, inputData, country) {
    const currentLabels = [];
    const currentData = [];
    let type = "";
    let label = "";
    switch (select.value) {
      case "Daily Deaths":
        label = "Daily Deaths";
        type = "new_deaths";
        break;

      case "Cumulative Cases":
        label = "Cumulative Cases";
        type = "confirmed";
        break;

      case "Cumulative Deaths":
        label = "Cumulative Deaths";
        type = "deaths";
        break;

      case "Log Cases":
        label = "Log Cases";
        type = "new_recovered";
        break;

      default:
        label = "Daily Cases";
        type = "new_confirmed";
        break;
    }
    if (country !== "full") {
      const countryData = await DataBase.getDataFromApi(
        "timelineCountry",
        country
      );
      const arr = Array.from(countryData.data.timeline);
      arr.forEach((element) => {
        currentLabels.push(element.updated_at);
        currentData.push(element[type]);
      });
    } else {
      inputData.forEach((element) => {
        currentLabels.push(element.updated_at);
        currentData.push(element[type]);
      });
    }
    const table = document.querySelector(".schedule_inner");
    table.innerHTML = "";
    const element = document.createElement("canvas");
    element.id = "schedule_chart";
    table.append(element);
    const ctx = document.querySelector("#schedule_chart");
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: currentLabels.reverse(),
        datasets: [
          {
            label: `${label}`,
            data: currentData.reverse(),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
