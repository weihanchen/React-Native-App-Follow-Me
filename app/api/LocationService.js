import {
   ERROR_MESSAGE,
   GOOGLE_API_KEY,
   GOOGLE_DIRECTIONS_URL,
   GOOGLE_GEOCODING_URL,
   LANGUAGE
} from '../config'
import checkStatus from './googleHelper'

export default class LocationService {
   requestDirections(startCoordinate, endCoordinate, mode) {
      const origin = `${startCoordinate.latitude},${startCoordinate.longitude}`
      const destination = `${endCoordinate.latitude},${endCoordinate.longitude}`
      const requestUrl = `${GOOGLE_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}&mode=${mode}`
      return fetch(requestUrl, {
            method: 'GET'
         })
         .then(checkStatus)
         .then(response => response.json())
         .then(body => {
            if (body.status !== 'OK') throw body.status
            const route = body.routes[0]
            const points = route.overview_polyline.points
            const directions = _decodePolyline(points)
            return directions
         })
   }

   //取得地理編碼，透過google maps geocoding api將地理位址轉為座標
   requestGeocoding(address) {
      const requestUrl = `${GOOGLE_GEOCODING_URL}?address=${encodeURI(address)}&language=${LANGUAGE}&key=${GOOGLE_API_KEY}`
      return fetch(requestUrl, {
            method: 'GET'
         })
         .then(checkStatus)
         .then(response => response.json())
         .then(body => {
            if (body.results.length <= 0) throw body.status
            const location = body.results[0].geometry.location
            return {
               latitude: location.lat,
               longitude: location.lng
            }
         })
   }

   requestGeolocation() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition((position) => {
            resolve(position)
         }, (error) => {
            reject(ERROR_MESSAGE.POSITION_ERROR)
         }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 1000
         });
      })
   }
}

const _decodePolyline = (encoded) => {
   if (!encoded) {
      return [];
   }
   var poly = [];
   var index = 0,
      len = encoded.length;
   var lat = 0,
      lng = 0;

   while (index < len) {
      var b, shift = 0,
         result = 0;

      do {
         b = encoded.charCodeAt(index++) - 63;
         result = result | ((b & 0x1f) << shift);
         shift += 5;
      } while (b >= 0x20);

      var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;

      do {
         b = encoded.charCodeAt(index++) - 63;
         result = result | ((b & 0x1f) << shift);
         shift += 5;
      } while (b >= 0x20);

      var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      var p = {
         latitude: lat / 1e5,
         longitude: lng / 1e5,
      };
      poly.push(p);
   }
   return poly;
}
