const haversine = require("haversine");
//units =  "km" | "mile" | "meter" | "nmi"
const calculateDistance = (start, end, unit = "km") => {
  try {
    return haversine(start, end, { unit: unit });
  } catch (err) {
    console.log(err);
    return 0;
  }
};
export default calculateDistance;
