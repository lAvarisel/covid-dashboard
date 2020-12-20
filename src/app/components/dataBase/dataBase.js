export default class DataBase {
  async init() {
    return this;
  }

  setAllDataToStorage() {
    const serialObj = JSON.stringify(this.appdata);
    window.localStorage.setItem("appCovidData", serialObj);
  }

  static async getDataFromApi(api, country) {
    let response = "";
    switch (api) {
      case "worldTotal":
        response = await fetch("https://api.covid19api.com/world/total");
        break;

      case "summary":
        response = await fetch("https://api.covid19api.com/summary");
        break;

      case "countries":
        response = await fetch("https://api.covid19api.com/countries");
        break;

      case "countryAllCases":
        response = await fetch(
          `https://api.covid19api.com/dayone/country/${country}`
        );
        break;

      default:
        break;
    }
    const appData = await response.json();
    return appData;
  }
}
