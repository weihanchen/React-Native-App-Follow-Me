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

export function* watchRequestTravelDirections() {
   yield call(takeEvery, REQUEST_TRAVEL_DIRECTIONS, requestTravelDirectionsFlow)
}

export function* watchRequestTravelInit() {
   yield call(takeEvery, REQUEST_TRAVEL_INIT, requestTravelInitFlow)
}

export function* watchRequestTravelUpdateCoordinate() {
   yield call(takeEvery, REQUEST_TRAVEL_UPDATE_COORDINATE, requestTravelUpdateCoordinateFlow)
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
      let markers = users.map(user => {
         let memberCoordinate = group.members[user.key].coordinate
         let type = MARKER_TYPE.MEMBER
         if (user.key === currentUid) {
           type = MARKER_TYPE.SELF
           memberCoordinate = Object.assign({}, coordinate)
         }
         else if (user.key === leaderId) type = MARKER_TYPE.LEADER
         return Object.assign({}, {
            coordinate: memberCoordinate,
            isActive: false,
            key: user.key,
            name: user.username,
            type
         })
      })
      markers.push(endPosition)
      yield put({
         type: REQUEST_TRAVEL_INIT_SUCCESS,
         coordinate,
         endPosition,
         isLeader,
         markers
      })
      yield put({
         type: UPDATE_TRAVEL_REGION,
         coordinate
      })
   } catch (error) {
      yield put({
         type: REQUEST_TRAVEL_FAILED,
         error
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
         error
      })
   }
}
