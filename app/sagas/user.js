import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'
import {
   REQUEST_FETCH_USER,
   REQUEST_FETCH_USER_FAILED,
   REQUEST_FETCH_USER_SUCCESS
} from '../actions'
import {
   FirebaseService
} from '../api'

export function* watchRequestFetchUser() {
   yield call(takeEvery, REQUEST_FETCH_USER, requestFetchUserFlow)
}

export function* requestFetchUserFlow(action) {
   try {
      const firebaseService = new FirebaseService()
      const user = yield call(firebaseService.requestFetchUser, action.userId)
      yield put({
        type: REQUEST_FETCH_USER_SUCCESS,
        user
      })
   } catch (error) {
      yield put({
        type: REQUEST_FETCH_USER_FAILED,
        error
      })
   }
}
