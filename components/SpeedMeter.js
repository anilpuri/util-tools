"use client";
import { useEffect, useState } from "react";
import calculateDistance from "@/utils/calculateDistance";
import getGeoLocation from "@/utils/getGeoLocation";
const SpeedMeter = () => {
  const [options, setOptions] = useState({
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  //units =  "km" | "mile" | "meter" | "nmi"
  const [selectedUnit, setSelectedUnit] = useState("km");
  useEffect(() => {
    let interval;
    if (tracking) {
      interval = setInterval(() => {
        intervalFunction();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [distanceCovered, currentLocation, selectedUnit, currentSpeed, tracking]);

  const intervalFunction = async () => {
    var currentLocationTemp = await getGeoLocation(options);
    if (currentLocationTemp) {
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
    setCurrentSpeed(0);
    setSelectedUnit(newUnit);
  };
  return (
    <div>
      {`Latitude: ${currentLocation?.latitude ?? 0}, Longitude: ${
        currentLocation?.longitude ?? 0
      }`}
      <br />
      {`High Accuracy: ${options?.enableHighAccuracy === true ? "Yes" : "No"}`}
      <br />
      {`Timeout: ${options?.timeout ?? 0}`}
      {tracking ? (
        <div style={{ paddingTop: "150px" }}>
          <h1 style={{ width: "100%", textAlign: "center", fontSize: "45px" }}>
            {currentSpeed}{" "}
            {
              { meter: "m/h", nmi: "nmi/h", mile: "mph", km: "km/h" }[
                selectedUnit
              ]
            }
          </h1>
          <h2 style={{ width: "100%", textAlign: "center" }}>
            Distance : {distanceCovered}{" "}
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
                fontSize: "16px",
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
                fontSize: "16px",
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
                fontSize: "16px",
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
                fontSize: "16px",
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
          <div style={{ width: "100%", textAlign: "center", padding: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={options?.enableHighAccuracy}
                onChange={(e) => {
                  setOptions((prev) => {
                    return { ...prev, enableHighAccuracy: e.target.checked };
                  });
                }}
              />
              <span style={{ userSelect: "none", cursor: "pointer" }}>
                {" "}
                Enable High Accuracy
              </span>
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                padding: "10px 25px",
                fontSize: "22px",
                borderRadius: "8px",
                margin: "5px",
                cursor: "pointer",
                border: "none",
                backgroundColor: `${
                  selectedUnit === "meter" ? "#282727" : "rgb(107, 107, 107)"
                }`,
              }}
              onClick={() => {
                setTracking(!tracking);
              }}
            >
              Stop Tracking
            </button>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: "200px", textAlign: "center" }}>
          <button
            style={{
              padding: "10px 25px",
              fontSize: "22px",
              borderRadius: "8px",
              margin: "5px",
              cursor: "pointer",
              border: "none",
              backgroundColor: `${
                selectedUnit === "meter" ? "#282727" : "rgb(107, 107, 107)"
              }`,
            }}
            onClick={() => {
              setTracking(!tracking);
            }}
          >
            Start Tracking
          </button>
        </div>
      )}
    </div>
  );
};
export default SpeedMeter;
