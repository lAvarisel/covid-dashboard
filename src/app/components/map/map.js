import "./map.scss";
/* eslint-disable new-cap */
export default class Map {
  init() {
    // const { leafletjs } = window;
    const mapOptions = {
      center: [30, 0],
      zoom: 2,
    };
    // eslint-disable-next-line no-undef
    const map = new L.map("map_inner", mapOptions);
    // eslint-disable-next-line no-undef
    const layer = new L.TileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    map.addLayer(layer);
    return this;
  }
}
