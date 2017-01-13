import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'

import {
   REQUEST_CREATEGROUP,
   REQUEST_CREATEGROUP_FAILED,
   REQUEST_CREATEGROUP_SUCCESS,
   REQUEST_FETCH_GROUP,
   REQUEST_FETCH_GROUP_FAILED,
   REQUEST_FETCH_GROUP_SUCCESS
} from '../actions'
import {
   FirebaseService
} from '../api'
const firebaseService = new FirebaseService()

export function* watchRequestCreateGroup() {
   yield call(takeEvery, REQUEST_CREATEGROUP, requestCreateGroupFlow)
}

export function* watchRequestFetchGroup() {
   yield call(takeEvery, REQUEST_FETCH_GROUP, requestFetchGroupFlow)
}

export function* requestCreateGroupFlow(action) {
   try {
      yield call(firebaseService.requestCreateGroup, action.groupName, action.username, action.expiredTime, action.startPosition, action.endPosition)
      yield put({
         type: REQUEST_CREATEGROUP_SUCCESS,
      })

   } catch (error) {
      yield put({
         type: REQUEST_CREATEGROUP_FAILED,
         error
      })
   }
}

export function* requestFetchGroupFlow(action) {
   try {
      const group = yield call(firebaseService.requestFetchGroup, action.groupId)
      yield put({
         type: REQUEST_FETCH_GROUP_SUCCESS,
         group
      })
   } catch (error) {
      yield put({
         type: REQUEST_FETCH_GROUP_FAILED,
         error
      })
   }
}
