import React from "react";
import "./map.scss";
const Map = ({ url }) => {
  return <iframe title="map" className="map-frame" src={url}></iframe>;
};

export default Map;
