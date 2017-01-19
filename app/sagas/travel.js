import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'
import {
   REQUEST_TRAVEL_DIRECTIONS,
   REQUEST_TRAVEL_DIRECTIONS_SUCCESS,
   REQUEST_TRAVEL_FAILED,
   REQUEST_TRAVEL_MARKERS,
   REQUEST_TRAVEL_MARKERS_SUCCESS
} from '../actions'
import {
   FirebaseService,
   LocationService
} from '../api'
import {
   MARKER_TYPE
} from '../config'
const firebaseService = new FirebaseService()
const locationService = new LocationService()

export function* watchRequestTravelDirections() {
   yield call(takeEvery, REQUEST_TRAVEL_DIRECTIONS, requestTravelDirectionsFlow)
}

export function* watchRequestTravelMarkers() {
   yield call(takeEvery, REQUEST_TRAVEL_MARKERS, requestTravelMarkersFlow)
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
         error
      })
   }
}

export function* requestTravelMarkersFlow(action) {
   try {
      let currentUser = action.currentUser
      let leader = yield call(firebaseService.requestFetchUser, action.leaderId)
      let members = yield call(firebaseService.requestFetchUsers, action.members)
      let endPosition = action.endPosition
      currentUser.type = MARKER_TYPE.SELF
      leader.type = MARKER_TYPE.LEADER
      endPosition.type = MARKER_TYPE.END_POSITION
      members = members
         .filter(member => member.username != currentUser.username)
         .map(member => Object.assign({}, member, {
            type: MARKER_TYPE.MEMBER
         }))
      let markers = [currentUser]
      markers.push(...members)
      if (leader.username != currentUser.username) markers.push(leader)
      markers.push(endPosition)
      markers = markers.map((marker, index) => Object.assign({}, marker, {
         key: index
      }))
      yield put({
         type: REQUEST_TRAVEL_MARKERS_SUCCESS,
         markers,
         currentUser
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error
      })
   }
}
