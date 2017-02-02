import {
   CHANGE_TRAVEL_MODE,
   REQUEST_TRAVEL_DIRECTIONS,
   REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
   REQUEST_TRAVEL_FAILED,
   REQUEST_TRAVEL_INIT,
   REQUEST_TRAVEL_INIT_SUCCESS,
   REQUEST_TRAVEL_UPDATE_COORDINATE,
   REQUEST_TRAVEL_UPDATE_COORDINATE_SUCCESS,
   UPDATE_TRAVEL_MARKERS,
   UPDATE_TRAVEL_REGION
} from '../actions'


const travel = (state = {
   coordinate: {
      latitude: 0,
      longitude: 0
   },
   endPosition: {
      coordinate: {

      }
   },
   region: {
      latitude: 0,
      longitude: 0
   },
   directions: [],
   error: null,
   markers: [],
   mode: 'driving',
   status: 'init'
}, action) => {
   switch (action.type) {
      case CHANGE_TRAVEL_MODE:
         return Object.assign({}, state, {
            status: 'change_mode',
            mode: action.mode
         })
         break
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
      case REQUEST_TRAVEL_FAILED:
         return Object.assign({}, state, {
            status: 'error',
            error: action.error
         })
         break
      case REQUEST_TRAVEL_INIT:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_TRAVEL_INIT_SUCCESS:
         return Object.assign({}, state, {
            status: 'request_init_success',
            coordinate: action.coordinate,
            endPosition: action.endPosition,
            markers: action.markers,
         })
         break
      case UPDATE_TRAVEL_MARKERS:
         return Object.assign({}, state, {
            status: 'update_travel_markers',
            markers: action.markers
         })
         break
      case UPDATE_TRAVEL_REGION:
         return Object.assign({}, state, {
            status: 'update_region',
            region: action.coordinate
         })
         break
      case REQUEST_TRAVEL_UPDATE_COORDINATE:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_TRAVEL_UPDATE_COORDINATE_SUCCESS:
         return Object.assign({}, state, {
            status: 'update_coordinate_success',
            coordinate: action.coordinate
         })
         break
      default:
         return state
   }
}

export default travel
