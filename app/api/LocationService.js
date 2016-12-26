export default class LocationService {
    requestGeolocation() {
      return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            var initialPosition = JSON.stringify(position)
            resolve(initialPosition)
        }, (error) => {
            reject(error)
        }, {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000
        });
      })
    }
}
