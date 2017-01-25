export const CHANGE_TRAVEL_MODE = 'CHANGE_TRAVEL_MODE'
export const REQUEST_TRAVEL_DIRECTIONS = 'REQUEST_TRAVEL_DIRECTIONS'
export const REQUEST_TRAVEL_DIRECTIONS_SUCCESS = 'REQUEST_TRAVEL_DIRECTIONS_SUCCESS'
export const REQUEST_TRAVEL_FAILED = 'REQUEST_TRAVEL_FAILED'
export const REQUEST_TRAVEL_MARKERS = 'REQUEST_TRAVEL_MARKERS'
export const REQUEST_TRAVEL_MARKERS_SUCCESS = 'REQUEST_TRAVEL_MARKERS_SUCCESS'
export const UPDATE_TRAVEL_MARKERS = 'UPDATE_TRAVEL_MARKERS'
export const UPDATE_TRAVEL_REGION = 'UPDATE_TRAVEL_REGION'

const changeTravelMode = (mode) => ({
   type: CHANGE_TRAVEL_MODE,
   mode
})

const requestFetchTravelMarkers = (currentUid, groupId) => ({
   type: REQUEST_TRAVEL_MARKERS,
   currentUid,
   groupId
})

const requestTravelDirections = (startCoordinate, endCoordinate, mode) => ({
   type: REQUEST_TRAVEL_DIRECTIONS,
   startCoordinate,
   endCoordinate,
   mode
})

const updateTravelMarkers = (markers, key, coordinate) => {
    const updatedMarkers = markers.map(marker => {
       if (marker.key === key) marker = Object.assign({}, marker, {coordinate})
       return marker
    })
    return {
      type: UPDATE_TRAVEL_MARKERS,
      markers: updatedMarkers
    }
}

const updateTravelRegion = (coordinate) => ({
   type: UPDATE_TRAVEL_REGION,
   coordinate
})

export {
   changeTravelMode,
   requestFetchTravelMarkers,
   requestTravelDirections,
   updateTravelMarkers,
   updateTravelRegion
}
