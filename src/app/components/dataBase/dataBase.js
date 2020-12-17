// eslint-disable-next-line import/no-extraneous-dependencies
// import "regenerator-runtime/runtime";

export default class DataBase {
  init() {
    const storage = window.localStorage;
    if (storage.getItem("appCovidData") === null) {
      //   this.getAllDataFromApi();
    } else {
      //   this.getAllDataFromStorage();
    }
    return this;
  }

  //   getAllDataFromStorage() {}

  setAllDataFromStorage() {
    window.localStorage.setItem("appCovidData", this.appdata);
  }

  //   getDataForCountry() {}

  async getAllDataFromApi() {
    console.log("получаем данные!");
    const response = await fetch("https://api.covid19api.com/all");
    this.appdata = await response.json();
    this.setAllDataFromStorage();
    return this.appdata;
  }

  async getTotalFromApi() {
    console.log("получаем данные!");
    const response = await fetch("https://api.covid19api.com/world/total");
    this.appdata = await response.json();
    return this.appdata;
  }
}
