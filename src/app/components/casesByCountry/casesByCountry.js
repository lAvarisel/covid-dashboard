import LoadingAnimation from "../loading/loading";
import "./casesByCountry.scss";

export default class CasesByCountry {
  init() {
    const loadingAnimate = new LoadingAnimation();
    document
      .querySelector(".casesByCountry")
      .append(loadingAnimate.init().loadAnimateInner);
    loadingAnimate.startAnimate();
    return this;
  }
}
