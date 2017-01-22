export const REQUEST_TRAVEL_DIRECTIONS = 'REQUEST_TRAVEL_DIRECTIONS'
export const REQUEST_TRAVEL_DIRECTIONS_SUCCESS = 'REQUEST_TRAVEL_DIRECTIONS_SUCCESS'
export const REQUEST_TRAVEL_REGION = 'REQUEST_TRAVEL_REGION'
export const REQUEST_TRAVEL_FAILED = 'REQUEST_TRAVEL_FAILED'
export const REQUEST_TRAVEL_MARKERS = 'REQUEST_TRAVEL_MARKERS'
export const REQUEST_TRAVEL_MARKERS_SUCCESS = 'REQUEST_TRAVEL_MARKERS_SUCCESS'

const requestFetchTravelMarkers = (currentUser, leaderId, members, endPosition) => ({
   type: REQUEST_TRAVEL_MARKERS,
   currentUser,
   leaderId,
   members,
   endPosition
})

const requestTravelRegion = (coordinate) => ({
   type: REQUEST_TRAVEL_REGION,
   coordinate
})

const requestTravelDirections = (startCoordinate, endCoordinate, mode) => ({
    type: REQUEST_TRAVEL_DIRECTIONS,
    startCoordinate,
    endCoordinate,
    mode
})

export {
   requestFetchTravelMarkers,
   requestTravelDirections,
   requestTravelRegion
}
