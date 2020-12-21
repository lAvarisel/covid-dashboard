export default class DataBase {
  async init() {
    return this;
  }

  static setAllDataToStorage(appdata, name) {
    const serialObj = JSON.stringify(appdata);
    window.localStorage.setItem(`${name}Covid`, serialObj);
  }

  static async getDataFromApi(api, country) {
    let response = "";
    // const currentDate = new Date()
    // let appData = ''
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
    DataBase.setAllDataToStorage(appData, api);
    return appData;
  }
}
