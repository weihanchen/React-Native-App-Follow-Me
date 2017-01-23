import {
   REQUEST_TRAVEL_DIRECTIONS,
   REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
   REQUEST_TRAVEL_MARKERS,
   REQUEST_TRAVEL_MARKERS_FAILED,
   REQUEST_TRAVEL_MARKERS_SUCCESS,
   UPDATE_TRAVEL_REGION
} from '../actions'


const travel = (state = {
   coordinate: {
     latitude: 0,
     longitude: 0
   },
   directions: [],
   error: null,
   markers: [],
   status: 'init'
}, action) => {
   switch (action.type) {
      case REQUEST_TRAVEL_DIRECTIONS:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_TRAVEL_DIRECTIONS_SUCCESS:
         return Object.assign({}, state, {
            status: 'request_directions_success',
            directions: action.directions
         })
         break
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
            status: 'request_marker_success',
            markers: action.markers,
            currentUser: action.currentUser
         })
         break
     case UPDATE_TRAVEL_REGION:
         return Object.assign({}, state, {
            status: 'update_region',
            coordinate: action.coordinate
         })
         break
      default:
        return state
   }
}

export default travel
