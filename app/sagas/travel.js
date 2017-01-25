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
      const group = yield call(firebaseService.requestFetchGroup, action.groupId)
      const currentUid = action.currentUid
      const leaderId = group.leader
      const userIdList = Object.keys(group.members)
      const users = yield call(firebaseService.requestFetchUsers, userIdList)
      const endPosition = Object.assign({}, group.endPosition, {type: MARKER_TYPE.END_POSITION, key: 'endPosition'})
      let markers = users.map(user => {
        const coordinate = group.members[user.key].coordinate
        let type = MARKER_TYPE.MEMBER
        if (user.key === currentUid) type = MARKER_TYPE.SELF
        else if (user.key === leaderId) type = MARKER_TYPE.LEADER
        return Object.assign({}, user, {coordinate, type})
      })
      markers.push(endPosition)
      yield put({
         type: REQUEST_TRAVEL_MARKERS_SUCCESS,
         markers
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error
      })
   }
}
