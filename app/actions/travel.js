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

export {
   requestFetchTravelMarkers
}
