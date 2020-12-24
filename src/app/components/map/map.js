import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geoCoord from "./geoLocation";
import DataBase from "../dataBase/dataBase";
import "./map.scss";
/* eslint-disable new-cap */
export default class Map {
  async init() {
    const summary = await DataBase.getDataFromApi("summary");
    const arrData = Array.from(summary.Countries);
    const mapOptions = {
      center: [30, 0],
      zoom: 2,
    };
    const map = new L.map("map_inner", mapOptions);
    const layer = new L.TileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    let markerArr = [];
    map.addLayer(layer);
    arrData.forEach((country) => {
      Map.createCircle(
        country.Country,
        country.TotalConfirmed,
        map,
        country.CountryCode.toLowerCase(),
        markerArr,
        country
      );
    });
    let markerLayer = L.featureGroup(markerArr);
    map.addLayer(markerLayer);
    document
      .querySelector(".casesByCountry_table")
      .addEventListener("click", (event) => {
        const currentActive = document.querySelector(
          ".casesByCountry_row--active"
        );
        map.removeLayer(markerLayer);
        markerArr = [];
        if (currentActive === null || currentActive === undefined) {
          const targetRow = event.target.closest("tr");
          const targetCountry = targetRow.querySelector(
            ".casesByCountry_country"
          ).textContent;
          Map.createActiveCircle(targetCountry, map, markerArr, arrData);
        } else {
          arrData.forEach((country) => {
            Map.createCircle(
              country.Country,
              country.TotalConfirmed,
              map,
              country.CountryCode.toLowerCase(),
              markerArr,
              country
            );
          });
        }
        markerLayer = L.featureGroup(markerArr);
        map.addLayer(markerLayer);
      });
    document
      .querySelector(".map_btn--fullscreen")
      .addEventListener("click", () => {
        document.querySelector(".map").classList.toggle("window--fullSize");
      });
    return this;
  }

  static createCircle(country, size, map, code, markerArr, fullInfo) {
    if (geoCoord[country] !== undefined) {
      const circleCenter = geoCoord[country];
      const minSize = 100000;
      const centerSize = 1000000;
      const maxSize = 5000000;
      let currentSize = 0;
      if (size < minSize) {
        currentSize = minSize;
      } else if (maxSize > size > centerSize) {
        currentSize = size;
      } else {
        currentSize = size / 15;
      }
      const circleOptions = {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
      };
      const circle = L.circle(circleCenter, currentSize, circleOptions);
      const iconOptions = {
        iconUrl: `https://www.countryflags.io/${code}/flat/64.png`,
        iconSize: [25, 25],
      };
      const customIcon = L.icon(iconOptions);
      const markerOptions = {
        title: `${country}`,
        clickable: true,
        icon: customIcon,
      };
      const marker = L.marker(circleCenter, markerOptions);
      marker
        .bindPopup(
          `${country} Total Confirmed: ${fullInfo.TotalConfirmed}<br/>
           Total Deaths: ${fullInfo.TotalDeaths}<br/>
           Total Recovered: ${fullInfo.TotalRecovered}`
        )
        .openPopup();
      markerArr.push(circle);
      markerArr.push(marker);
    } else {
      console.log(country);
    }
  }

  static createActiveCircle(country, map, markerArr, fullData) {
    if (geoCoord[country] !== undefined) {
      const circleCenter = geoCoord[country];
      const currentSize = 500000;
      let fullInfoTargetCountry = "";
      const circleOptions = {
        color: "green",
        fillColor: "#f03",
        fillOpacity: 0.5,
      };
      fullData.forEach((element) => {
        if (element.Country === country) {
          fullInfoTargetCountry = element;
        }
      });
      const circle = L.circle(circleCenter, currentSize, circleOptions);
      const iconOptions = {
        iconUrl: `https://www.countryflags.io/${fullInfoTargetCountry.CountryCode}/flat/64.png`,
        iconSize: [25, 25],
      };
      const customIcon = L.icon(iconOptions);
      const markerOptions = {
        title: `${country}`,
        clickable: true,
        icon: customIcon,
      };
      const marker = L.marker(circleCenter, markerOptions);
      marker
        .bindPopup(
          `${country} Total Confirmed: ${fullInfoTargetCountry.TotalConfirmed}<br/>
           Total Deaths: ${fullInfoTargetCountry.TotalDeaths}<br/>
           Total Recovered: ${fullInfoTargetCountry.TotalRecovered}`
        )
        .openPopup();
      markerArr.push(circle);
      markerArr.push(marker);
    } else {
      console.log(country);
    }
  }
}
