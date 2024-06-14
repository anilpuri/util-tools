"use client";
import { useEffect, useState } from "react";
import calculateDistance from "@/utils/calculateDistance";
import getGeoLocation from "@/utils/getGeoLocation";
const SpeedMeter = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 29.9000643,
    longitude: 78.7255078,
  });
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  //units =  "km" | "mile" | "meter" | "nmi"
  const [selectedUnit, setSelectedUnit] = useState("meter");
  useEffect(() => {
    const interval = setInterval(() => {
      intervalFunction();
    }, 1000);
    return () => clearInterval(interval);
  }, [distanceCovered, currentLocation, selectedUnit]);

  const intervalFunction = async () => {
    var currentLocationTemp = await getGeoLocation();
    if (currentLocationTemp) {
      console.log(currentLocationTemp);
      console.log(currentLocation);
      var distance = calculateDistance(
        currentLocation,
        currentLocationTemp,
        selectedUnit
      );
      var newDistance = Number(distanceCovered) + (distance ?? 0);
      setDistanceCovered(parseFloat(newDistance).toFixed(2));
      setCurrentLocation(currentLocationTemp);
      setCurrentSpeed(parseInt(distance ?? 0) * 3600);
    }
  };

  const changeSelectedUnit = (newUnit) => {
    setDistanceCovered(0);
    setSelectedUnit(newUnit);
  };
  return (
    <div style={{ paddingTop: "200px" }}>
      <h1 style={{ width: "100%", textAlign: "center" }}>
        Current Speed : {currentSpeed}{" "}
        {{ meter: "m/h", nmi: "nmi/h", mile: "mph", km: "km/h" }[selectedUnit]}
      </h1>
      <h2 style={{ width: "100%", textAlign: "center" }}>
        Distance Covered : {distanceCovered}{" "}
        {
          { meter: "Meters", nmi: "Nmi's", mile: "Miles", km: "Km's" }[
            selectedUnit
          ]
        }
      </h2>
      <div style={{ width: "100%", textAlign: "center", padding: "10px" }}>
        <button
          style={{
            padding: "10px 15px",
            fontSize:"16px",
            margin: "5px",
            cursor: "pointer",
            border: "none",
            backgroundColor: `${
              selectedUnit === "meter" ? "#282727" : "rgb(107, 107, 107)"
            }`,
          }}
          onClick={() => {
            changeSelectedUnit("meter");
          }}
        >
          Meter
        </button>
        <button
          style={{
            padding: "10px 15px",
            fontSize:"16px",
            margin: "5px",
            cursor: "pointer",
            border: "none",
            backgroundColor: `${
              selectedUnit === "mile" ? "#282727" : "rgb(107, 107, 107)"
            }`,
          }}
          onClick={() => {
            changeSelectedUnit("mile");
          }}
        >
          Mile
        </button>
        <button
          style={{
            padding: "10px 15px",
            fontSize:"16px",
            margin: "5px",
            cursor: "pointer",
            border: "none",
            backgroundColor: `${
              selectedUnit === "km" ? "#282727" : "rgb(107, 107, 107)"
            }`,
          }}
          onClick={() => {
            changeSelectedUnit("km");
          }}
        >
          Km
        </button>
        <button
          style={{
            padding: "10px 15px",
            fontSize:"16px",
            margin: "5px",
            cursor: "pointer",
            border: "none",
            backgroundColor: `${
              selectedUnit === "nmi" ? "#282727" : "rgb(107, 107, 107)"
            }`,
          }}
          onClick={() => {
            changeSelectedUnit("nmi");
          }}
        >
          Nmi
        </button>
      </div>
    </div>
  );
};
export default SpeedMeter;
