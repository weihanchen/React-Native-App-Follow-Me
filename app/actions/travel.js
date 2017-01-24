export const CHANGE_TRAVEL_MODE = 'CHANGE_TRAVEL_MODE'
export const REQUEST_TRAVEL_DIRECTIONS = 'REQUEST_TRAVEL_DIRECTIONS'
export const REQUEST_TRAVEL_DIRECTIONS_SUCCESS = 'REQUEST_TRAVEL_DIRECTIONS_SUCCESS'
export const REQUEST_TRAVEL_FAILED = 'REQUEST_TRAVEL_FAILED'
export const REQUEST_TRAVEL_MARKERS = 'REQUEST_TRAVEL_MARKERS'
export const REQUEST_TRAVEL_MARKERS_SUCCESS = 'REQUEST_TRAVEL_MARKERS_SUCCESS'
export const UPDATE_TRAVEL_REGION = 'UPDATE_TRAVEL_REGION'

const changeTravelMode = (mode) => ({
   type: CHANGE_TRAVEL_MODE,
   mode
})

const requestFetchTravelMarkers = (currentUser, leaderId, members, endPosition) => ({
   type: REQUEST_TRAVEL_MARKERS,
   currentUser,
   leaderId,
   members,
   endPosition
})

const requestTravelDirections = (startCoordinate, endCoordinate, mode) => ({
   type: REQUEST_TRAVEL_DIRECTIONS,
   startCoordinate,
   endCoordinate,
   mode
})

const updateTravelRegion = (coordinate) => ({
   type: UPDATE_TRAVEL_REGION,
   coordinate
})

export {
   changeTravelMode,
   requestFetchTravelMarkers,
   requestTravelDirections,
   updateTravelRegion
}
