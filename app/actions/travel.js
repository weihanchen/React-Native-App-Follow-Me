const REQUEST_TRAVEL_DATA = 'REQUEST_TRAVEL_DATA'
const REQUEST_TRAVEL_DATA_FAILED = 'REQUEST_TRAVEL_DATA_FAILED'
const REQUEST_TRAVEL_DATA_SUCCESS = 'REQUEST_TRAVEL_DATA_SUCCESS'

const requestFetchTravelData = (currentUid, leaderId, members) => ({
   type: REQUEST_TRAVEL_DATA,
   currentUid,
   leaderId,
   members
})

export {
   requestFetchTravelData
}
