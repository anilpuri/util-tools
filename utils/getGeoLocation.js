const getGeoLocation = async () => {
  try {
    if (navigator.geolocation) {
      var location = await getCurrentPosition();
      return location;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      }
    );
  });
}
export default getGeoLocation;
