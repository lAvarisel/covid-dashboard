import CreateDomElement from "../../utils";
import "./loading.scss";

export default class LoadingAnimation {
  init() {
    this.loadAnimateInner = CreateDomElement("div", "loader");
    const loadAnimate = CreateDomElement("div", "cssload_loader");
    const animateItemOne = CreateDomElement("div", "cssload_inner");
    const animateItemTwo = CreateDomElement("div", "cssload_inner");
    const animateItemThree = CreateDomElement("div", "cssload_inner");
    animateItemOne.classList.add("cssload_one");
    animateItemTwo.classList.add("cssload_two");
    animateItemThree.classList.add("cssload_three");
    this.loadAnimateInner.append(loadAnimate);
    loadAnimate.append(animateItemOne);
    loadAnimate.append(animateItemTwo);
    loadAnimate.append(animateItemThree);
    return this;
  }

  startAnimate() {
    this.loadAnimateInner.classList.add("loader_animation--play");
  }

  stopAnimate() {
    this.loadAnimateInner.classList.remove("loader_animation--play");
  }
}
