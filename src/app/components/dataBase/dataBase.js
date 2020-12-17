export default class DataBase {
  init() {
    return this;
  }

  setAllDataFromStorage() {
    window.localStorage.setItem("appCovidData", this.appdata);
  }

  async getAllDataFromApi() {
    const response = await fetch("https://api.covid19api.com/all");
    this.appdata = await response.json();
    this.setAllDataFromStorage();
    return this.appdata;
  }

  async getTotalFromApi() {
    const response = await fetch("https://api.covid19api.com/world/total");
    this.appdata = await response.json();
    return this.appdata;
  }
}
