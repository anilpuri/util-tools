const getGeoLocation = async (options = null) => {
  try {
    if (navigator.geolocation) {
      var location = await getCurrentPosition(options);
      return location;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
function getCurrentPosition(options = null) {
  console.log(options)
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
      },
      options
    );
  });
}
export default getGeoLocation;
