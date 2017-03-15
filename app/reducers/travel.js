import {
   CHANGE_TRAVEL_MODE,
   REMOVE_MEMBER,
   REQUEST_ADD_TRAVEL_MEMBER,
   REQUEST_ADD_TRAVEL_MEMBER_SUCCESS,
   REQUEST_MARKER_ACTIVE_DIRECTION,
   REQUEST_MARKER_ACTIVE_DIRECTION_SUCCESS,
   REQUEST_TRAVEL_DIRECTIONS,
   REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
   REQUEST_TRAVEL_FAILED,
   REQUEST_TRAVEL_INIT,
   REQUEST_TRAVEL_INIT_SUCCESS,
   REQUEST_TRAVEL_UPDATE_ALERTING,
   REQUEST_TRAVEL_UPDATE_ALERTING_SUCCESS,
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
   activePosition: {
      coordinate: {

      }
   },
   isLeader: false,
   isAlerting: false,
   region: {
      latitude: 0,
      longitude: 0
   },
   directions: [],
   error: null,
   markers: [],
   memberMap: {},
   mode: 'driving',
   newMember: {},
   status: 'init'
}, action) => {
   switch (action.type) {
      case CHANGE_TRAVEL_MODE:
         return Object.assign({}, state, {
            status: 'change_mode',
            mode: action.mode
         })
         break
      case REMOVE_MEMBER:
         return Object.assign({}, state, {
            status: 'remove_member_success',
            markers: action.markers,
            memberMap: action.memberMap
         })
         break
      case REQUEST_ADD_TRAVEL_MEMBER:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_ADD_TRAVEL_MEMBER_SUCCESS:
         const markers = [...state.markers]
         if (markers.findIndex(marker => marker.key === action.marker.key) == -1) markers.push(action.marker)
         const memberMap = Object.assign({}, state.memberMap, action.memberMap)
         return Object.assign({}, state, {
            status: 'request_add_member_success',
            markers,
            memberMap,
            newMember: action.newMember
         })
         break
      case REQUEST_MARKER_ACTIVE_DIRECTION:
         return Object.assign({}, state, {
           status: 'loading',
           error: null
         })
         break
      case REQUEST_MARKER_ACTIVE_DIRECTION_SUCCESS:
         return Object.assign({}, state, {
            status: 'request_marker_active_success',
            directions: action.directions,
            markers: action.markers,
            activePosition: action.activePosition
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
            activePosition: action.endPosition,
            isAlerting: action.isAlerting,
            isLeader: action.isLeader,
            markers: action.markers,
            memberMap: action.memberMap
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
      case REQUEST_TRAVEL_UPDATE_ALERTING:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_TRAVEL_UPDATE_ALERTING_SUCCESS:
         return Object.assign({}, state, {
            status: 'update_alerting_success',
            isAlerting: action.isAlerting
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
