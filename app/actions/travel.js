export const REQUEST_TRAVEL_MARKERS = 'REQUEST_TRAVEL_MARKERS'
export const REQUEST_TRAVEL_MARKERS_FAILED = 'REQUEST_TRAVEL_MARKERS_FAILED'
export const REQUEST_TRAVEL_MARKERS_SUCCESS = 'REQUEST_TRAVEL_MARKERS_SUCCESS'

const requestFetchTravelMarkers = (currentUid, leaderId, members, endPosition) => ({
   type: REQUEST_TRAVEL_MARKERS,
   currentUid,
   leaderId,
   members,
   endPosition
})

export {
   requestFetchTravelMarkers
}
