export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION'
export const REQUEST_GEOLOCATION_FAILED = 'REQUEST_GEOLOCATION_FAILED'
export const REQUEST_GEOLOCATION_SUCCESS = 'REQUEST_GEOLOCATION_SUCCESS'

const requestGeolocation = () => {
    return {
      type: REQUEST_GEOLOCATION
    }
}

export {
  requestGeolocation
}
