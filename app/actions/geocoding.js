export const REQUEST_GEOCODING = 'REQUEST_GEOCODING'
export const REQUEST_GEOCODING_FAILED = 'REQUEST_GEOCODING_FAILED'
export const REQUEST_GEOCODING_SUCCESS = 'REQUEST_GEOCODING_SUCCESS'
const requestGeocoding = (address) => {
   return {
      type: REQUEST_GEOCODING,
      address
   }
}
export {
   requestGeocoding
}
