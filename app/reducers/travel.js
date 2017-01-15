import {
   REQUEST_TRAVEL_MARKERS,
   REQUEST_TRAVEL_MARKERS_FAILED,
   REQUEST_TRAVEL_MARKERS_SUCCESS
} from '../actions'

const travel = (state = {
   error: null,
   status: 'init',
   markers: []
}, action) => {
   switch (action.type) {
      case REQUEST_TRAVEL_MARKERS:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_TRAVEL_MARKERS_FAILED:
         return Object.assign({}, state, {
            status: 'error',
            error: action.error
         })
         break
      case REQUEST_TRAVEL_MARKERS_SUCCESS:
         return Object.assign({}, state, {
            markers: action.markers
         })
         break
      default:
        return state
   }
}

export default travel
