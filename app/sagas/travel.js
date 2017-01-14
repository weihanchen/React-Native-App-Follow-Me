import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'
import {
   REQUEST_TRAVEL_DATA,
   REQUEST_TRAVEL_DATA_FAILED,
   REQUEST_TRAVEL_DATA_SUCCESS
} from '../actions'
import {
   FirebaseService
} from '../api'
const firebaseService = new FirebaseService()

export function* watchRequestTravelData() {
   yield call(takeEvery, REQUEST_TRAVEL_DATA, requestTravelDataFlow)
}

export function* requestTravelDataFlow(action) {
   try {

   } catch (error) {
      yield put({
         type: REQUEST_GEOLOCATION_FAILED,
         error
      })
   }
}
