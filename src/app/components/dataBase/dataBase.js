export default class DataBase {
  async init() {
    return this;
  }

  setAllDataToStorage() {
    const serialObj = JSON.stringify(this.appdata);
    window.localStorage.setItem("appCovidData", serialObj);
  }

  async getAllDataFromApi() {
    const response = await fetch("https://api.covid19api.com/all");
    this.appdata = await response.json();
    return this.appdata;
  }

  async getTotalFromApi() {
    const response = await fetch("https://api.covid19api.com/world/total");
    this.appdata = await response.json();
    return this.appdata;
  }

  async getSummaryFromApi() {
    const response = await fetch("https://api.covid19api.com/summary");
    this.appdata = await response.json();
    return this.appdata;
  }
}
