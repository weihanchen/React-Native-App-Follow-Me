import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'
import {
   REQUEST_ADD_TRAVEL_MEMBER,
   REQUEST_ADD_TRAVEL_MEMBER_SUCCESS,
   REQUEST_MARKER_ACTIVE_DIRECTION,
   REQUEST_MARKER_ACTIVE_DIRECTION_SUCCESS,
   REQUEST_TRAVEL_DIRECTIONS,
   REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
   REQUEST_TRAVEL_FAILED,
   REQUEST_TRAVEL_INIT,
   REQUEST_TRAVEL_INIT_SUCCESS,
   REQUEST_TRAVEL_UPDATE_COORDINATE,
   REQUEST_TRAVEL_UPDATE_COORDINATE_SUCCESS,
   UPDATE_TRAVEL_REGION
} from '../actions'
import {
   FirebaseService,
   LocationService
} from '../api'
import {
   LANGUAGE_KEY,
   MARKER_TYPE
} from '../config'
const firebaseService = new FirebaseService()
const locationService = new LocationService()

export function* watchRequestAddTravelMember() {
   yield call(takeEvery, REQUEST_ADD_TRAVEL_MEMBER, requestAddTravelMemberFlow)
}

export function* watchRequestMarkerActiveDirection() {
   yield call(takeEvery, REQUEST_MARKER_ACTIVE_DIRECTION, requestMarkerActiveDirectionFlow)
}

export function* watchRequestTravelDirections() {
   yield call(takeEvery, REQUEST_TRAVEL_DIRECTIONS, requestTravelDirectionsFlow)
}

export function* watchRequestTravelInit() {
   yield call(takeEvery, REQUEST_TRAVEL_INIT, requestTravelInitFlow)
}

export function* watchRequestTravelUpdateCoordinate() {
   yield call(takeEvery, REQUEST_TRAVEL_UPDATE_COORDINATE, requestTravelUpdateCoordinateFlow)
}

export function* requestAddTravelMemberFlow(action) {
   try {
      const {
         member
      } = action
      const user = yield call(firebaseService.requestFetchUser, member.key)
      const marker = {
         coordinate: member.coordinate,
         isActive: false,
         key: user.key,
         name: user.userName,
         type: MARKER_TYPE.MEMBER
      }
      const memberMap = {}
      memberMap[user.key] = user
      yield put({
         type: REQUEST_ADD_TRAVEL_MEMBER_SUCCESS,
         marker,
         memberMap,
         newMember: user
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error: error.toString()
      })
   }
}

export function* requestMarkerActiveDirectionFlow(action) {
   try {
      const {
         startCoordinate,
         markers,
         mode
      } = action
      const activeMarker = action.marker
      const activePosition = {
         coordinate: activeMarker.coordinate
      }
      const updatedMarkers = markers.map(marker => {
         if (marker.key === activeMarker.key) marker = Object.assign({}, marker, {
            isActive: true
         })
         else marker = Object.assign({}, marker, {
            isActive: false
         })
         return marker
      })
      const directions = yield call(locationService.requestDirections, startCoordinate, activePosition.coordinate, mode)
      yield put({
         type: REQUEST_MARKER_ACTIVE_DIRECTION_SUCCESS,
         activePosition,
         directions,
         markers: updatedMarkers
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error: typeof error === 'string' ? error : error.toString()
      })
   }
}

export function* requestTravelDirectionsFlow(action) {
   try {
      const directions = yield call(locationService.requestDirections, action.startCoordinate, action.endCoordinate, action.mode)
      yield put({
         type: REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
         directions
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error: typeof error === 'string' ? error : error.toString()
      })
   }
}

export function* requestTravelInitFlow(action) {
   try {
      const group = yield call(firebaseService.requestFetchGroup, action.groupId)
      const coordinate = action.coordinate
      const currentUid = action.currentUid
      const leaderId = group.leader
      const isLeader = currentUid === leaderId
      const userIdList = Object.keys(group.members)
      const users = yield call(firebaseService.requestFetchUsers, userIdList)
      const endPosition = Object.assign({}, {
         coordinate: group.endPosition.coordinate,
         isActive: true,
         key: 'endPosition',
         type: MARKER_TYPE.END_POSITION,
         name: LANGUAGE_KEY.END_POSITION
      })
      let memberMap = {}
      let markers = users.map(user => {
         let memberCoordinate = group.members[user.key].coordinate
         let type = MARKER_TYPE.MEMBER

         if (user.key === currentUid) {
            type = MARKER_TYPE.SELF
            memberCoordinate = Object.assign({}, coordinate)
         } else if (user.key === leaderId) type = MARKER_TYPE.LEADER
         memberMap[user.key] = user
         return Object.assign({}, {
            coordinate: memberCoordinate,
            isActive: false,
            key: user.key,
            name: user.userName,
            type,
            imageUrl: user.imageUrl
         })
      })
      markers.push(endPosition)
      yield put({
         type: REQUEST_TRAVEL_INIT_SUCCESS,
         coordinate,
         endPosition,
         isLeader,
         markers,
         memberMap
      })
      yield put({
         type: UPDATE_TRAVEL_REGION,
         coordinate
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error: error.toString()
      })
   }
}

export function* requestTravelUpdateCoordinateFlow(action) {
   try {
      const coordinate = action.coordinate
      yield call(firebaseService.updateCoordinate, action.groupId, action.userId, coordinate)
      yield put({
         type: REQUEST_TRAVEL_UPDATE_COORDINATE_SUCCESS,
         coordinate
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error: error.toString()
      })
   }
}
