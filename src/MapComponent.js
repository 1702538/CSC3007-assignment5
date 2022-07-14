import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import {
  MapContainer,
  TileLayer,
  LayerGroup,
  CircleMarker,
  Marker,
  Tooltip,
} from "react-leaflet";

function MapComponent() {
  const [apiData, setApiData] = useState([]);
  const [timeStamp, setTimeStamp] = useState();

  // UseState for the five locations
  const [westLatLong, setWestLatLong] = useState([1.289, 103.8466]);
  const [eastLatLong, setEastLatLong] = useState([1.289, 103.8466]);
  const [centralLatLong, setCentralLatLong] = useState([1.289, 103.8466]);
  const [southLatLong, setSouthLatLong] = useState([1.289, 103.8466]);
  const [northLatLong, setNorthLatLong] = useState([1.289, 103.8466]);

  // UseState for the five PSI readings
  const [westPSI, setWestPSI] = useState();
  const [eastPSI, setEastPSI] = useState();
  const [centralPSI, setCentralPSI] = useState();
  const [southPSI, setSouthPSI] = useState();
  const [northPSI, setNorthPSI] = useState();

  useEffect(() => {
    getPSI();
  }, []);

  const getPSI = async () => {
    await Axios.get("https://api.data.gov.sg/v1/environment/psi").then(
      (result) => {
        console.log(result);

        setTimeStamp(result.data.items[0].update_timestamp);

        setWestLatLong([
          result.data.region_metadata[0].label_location.latitude,
          result.data.region_metadata[0].label_location.longitude,
        ]);

        setEastLatLong([
          result.data.region_metadata[2].label_location.latitude,
          result.data.region_metadata[2].label_location.longitude,
        ]);

        setCentralLatLong([
          result.data.region_metadata[3].label_location.latitude,
          result.data.region_metadata[3].label_location.longitude,
        ]);

        setSouthLatLong([
          result.data.region_metadata[4].label_location.latitude,
          result.data.region_metadata[4].label_location.longitude,
        ]);

        setNorthLatLong([
          result.data.region_metadata[5].label_location.latitude,
          result.data.region_metadata[5].label_location.longitude,
        ]);

        console.log(
          "1",
          result.data.items[0].readings.psi_twenty_four_hourly.west
        );

        setWestPSI(result.data.items[0].readings.psi_twenty_four_hourly.west);
        setEastPSI(result.data.items[0].readings.psi_twenty_four_hourly.east);
        setCentralPSI(
          result.data.items[0].readings.psi_twenty_four_hourly.central
        );
        setSouthPSI(result.data.items[0].readings.psi_twenty_four_hourly.south);
        setNorthPSI(result.data.items[0].readings.psi_twenty_four_hourly.north);
      }
    );
  };

  console.log(
    "PSI: " +
      westPSI +
      ", " +
      eastPSI +
      ", " +
      centralPSI +
      ", " +
      southPSI +
      ", " +
      northPSI
  );

  const centerSG = [1.352398850176066, 103.81313647076767];
  const fillBlueOptions = { fillColor: "blue", color: "blue" };
  const fillOrangeOptions = { fillColor: "orange", color: "orange" };
  const fillRedOptions = { fillColor: "red", color: "red" };

  return (
    <div>
      <h1>Singapore PSI Readings</h1>
      <h3>
        Last Updated: {moment(timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
      </h3>
      <center>
        <MapContainer center={centerSG} zoom={11.5} scrollWheelZoom={true}>
          <TileLayer
            attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;">
            New OneMap | Map data © contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
            url="https://maps-{s}.onemap.sg/v3/Grey/{z}/{x}/{y}.png"
          />
          <LayerGroup>
            <CircleMarker
              center={westLatLong}
              pathOptions={
                westPSI < 40
                  ? fillBlueOptions
                  : westPSI < 50
                  ? fillOrangeOptions
                  : fillRedOptions
              }
              radius={40}
            >
              <Marker
                position={[westLatLong[0], westLatLong[1]]}
                pathOptions={
                  westPSI < 40
                    ? fillBlueOptions
                    : westPSI < 50
                    ? fillOrangeOptions
                    : fillRedOptions
                }
              >
                <Tooltip
                  direction="top"
                  offset={[-15, -10]}
                  opacity={1}
                  permanent
                >
                  <h2>PSI: {westPSI}</h2>
                </Tooltip>
              </Marker>
            </CircleMarker>
            <CircleMarker
              center={eastLatLong}
              pathOptions={
                eastPSI < 40
                  ? fillBlueOptions
                  : eastPSI < 50
                  ? fillOrangeOptions
                  : fillRedOptions
              }
              radius={40}
            >
              <Marker
                position={[eastLatLong[0], eastLatLong[1]]}
                pathOptions={
                  eastPSI < 40
                    ? fillBlueOptions
                    : eastPSI < 50
                    ? fillOrangeOptions
                    : fillRedOptions
                }
              >
                <Tooltip
                  direction="top"
                  offset={[-15, -10]}
                  opacity={1}
                  permanent
                >
                  <h2>PSI: {eastPSI}</h2>
                </Tooltip>
              </Marker>
            </CircleMarker>
            <CircleMarker
              center={centralLatLong}
              pathOptions={
                centralPSI < 40
                  ? fillBlueOptions
                  : centralPSI < 50
                  ? fillOrangeOptions
                  : fillRedOptions
              }
              radius={40}
            >
              <Marker
                position={[centralLatLong[0], centralLatLong[1]]}
                pathOptions={
                  centralPSI < 40
                    ? fillBlueOptions
                    : centralPSI < 50
                    ? fillOrangeOptions
                    : fillRedOptions
                }
              >
                <Tooltip
                  direction="top"
                  offset={[-15, -10]}
                  opacity={1}
                  permanent
                >
                  <h2>PSI: {centralPSI}</h2>
                </Tooltip>
              </Marker>
            </CircleMarker>
            <CircleMarker
              center={southLatLong}
              pathOptions={
                southPSI < 40
                  ? fillBlueOptions
                  : southPSI < 50
                  ? fillOrangeOptions
                  : fillRedOptions
              }
              radius={40}
            >
              <Marker
                position={[southLatLong[0], southLatLong[1]]}
                pathOptions={
                  southPSI < 40
                    ? fillBlueOptions
                    : southPSI < 50
                    ? fillOrangeOptions
                    : fillRedOptions
                }
              >
                <Tooltip
                  direction="top"
                  offset={[-15, -10]}
                  opacity={1}
                  permanent
                >
                  <h2>PSI: {southPSI}</h2>
                </Tooltip>
              </Marker>
            </CircleMarker>
            <CircleMarker
              center={northLatLong}
              pathOptions={
                northPSI < 40
                  ? fillBlueOptions
                  : northPSI < 50
                  ? fillOrangeOptions
                  : fillRedOptions
              }
              radius={40}
            >
              <Marker
                position={[northLatLong[0], northLatLong[1]]}
                pathOptions={
                  northPSI < 40
                    ? fillBlueOptions
                    : northPSI < 50
                    ? fillOrangeOptions
                    : fillRedOptions
                }
              >
                <Tooltip
                  direction="top"
                  offset={[-15, -10]}
                  opacity={1}
                  permanent
                >
                  <h2>PSI: {northPSI}</h2>
                </Tooltip>
              </Marker>
            </CircleMarker>
          </LayerGroup>
        </MapContainer>
      </center>
    </div>
  );
}

export default MapComponent;
