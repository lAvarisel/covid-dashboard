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
    Schedule.render(select);
    loadingAnimate.stopAnimate();
    return this;
  }

  static async getCasesByCountry(country) {
    const cases = await DataBase.getDataFromApi("countryAllCases", country);
    return cases;
  }

  static render(select) {
    let label = "";
    switch (select) {
      case "Daily Deaths":
        break;

      case "Cumulative Cases":
        break;

      case "Cumulative Deaths":
        break;

      case "Log Cases":
        break;

      default:
        label = "Daily Cases";
        break;
    }
    const ctx = document.querySelector("#schedule_chart");
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: `${label}`,
            data: [12, 19, 3, 5, 2, 3],
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
