import {
   REQUEST_TRAVEL_DIRECTIONS,
   REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
   REQUEST_TRAVEL_REGION,
   REQUEST_TRAVEL_MARKERS,
   REQUEST_TRAVEL_MARKERS_FAILED,
   REQUEST_TRAVEL_MARKERS_SUCCESS
} from '../actions'
import {Dimensions} from 'react-native'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const travel = (state = {
   directions: [],
   error: null,
   markers: [],
   region: {
     latitude: 0,
     longitude: 0,
     latitudeDelta: LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA
   },
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
      case REQUEST_TRAVEL_REGION:
         return Object.assign({}, state, {
            status: 'request_region_success',
            region: {
              latitude: action.coordinate.latitude,
              longitude: action.coordinate.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
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
      default:
        return state
   }
}

export default travel
