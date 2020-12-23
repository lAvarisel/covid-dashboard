export default class DataBase {
  async init() {
    return this;
  }

  static setAllDataToStorage(appdata, name) {
    const serialObj = JSON.stringify(appdata);
    window.localStorage.setItem(`${name}Covid`, serialObj);
    const dataNow = new Date();
    const formatedDate = dataNow.toDateString();
    let dataStorage = window.localStorage.getItem("lastCovidUpdate");
    if (dataStorage !== null && dataStorage !== undefined) {
      dataStorage = JSON.parse(window.localStorage.getItem("lastCovidUpdate"));
      dataStorage[name] = formatedDate;
    } else {
      dataStorage = {};
      dataStorage[name] = formatedDate;
    }
    const serialDate = JSON.stringify(dataStorage);
    window.localStorage.setItem("lastCovidUpdate", serialDate);
  }

  static checkDateUpdate(name) {
    let result = false;
    const dataNow = new Date();
    const formatedDate = dataNow.toDateString();
    let dataStorage = window.localStorage.getItem("lastCovidUpdate");
    if (dataStorage !== null && dataStorage !== undefined) {
      dataStorage = JSON.parse(window.localStorage.getItem("lastCovidUpdate"));
      if (dataStorage[name] === formatedDate) {
        result = true;
      }
    }
    return result;
  }

  static async getDataFromApi(api, country) {
    let appData = "";
    let response = "";
    const isUpdated = DataBase.checkDateUpdate(api);
    if (isUpdated) {
      const dataStorage = JSON.parse(
        window.localStorage.getItem(`${api}Covid`)
      );
      appData = dataStorage;
    } else {
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
      appData = await response.json();
      DataBase.setAllDataToStorage(appData, api);
    }
    return appData;
  }
}
