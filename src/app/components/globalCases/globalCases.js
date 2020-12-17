import "./globalCases.scss";
import DataBase from "../dataBase/dataBase";

export default class globalCases {
  async init() {
    const dataBase = new DataBase();
    dataBase.init();
    const totalCount = await dataBase.getTotalFromApi();
    this.setCount(totalCount.TotalConfirmed);
    return this;
  }

  setCount(count) {
    const totalCount = count
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    document.querySelector("#globalCases_count").textContent = totalCount;
  }
}
