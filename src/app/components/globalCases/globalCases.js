import "./globalCases.scss";
import DataBase from "../dataBase/dataBase";
import LoadingAnimation from "../loading/loading";

export default class GlobalCases {
  async init() {
    const loadingAnimate = new LoadingAnimation();
    document
      .querySelector(".globalCases_inner")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    const totalCount = await DataBase.getDataFromApi("worldTotal");
    loadingAnimate.stopAnimate();
    GlobalCases.setCount(totalCount.TotalConfirmed);
    document
      .querySelector(".globalCases_btn--fullscreen")
      .addEventListener("click", () => {
        document
          .querySelector(".globalCases")
          .classList.toggle("window--fullSize");
      });
    return this;
  }

  static setCount(count) {
    const totalCount = count
      .toString()
      .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    document.querySelector("#globalCases_count").textContent = totalCount;
  }
}
