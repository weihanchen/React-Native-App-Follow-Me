import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'

import {
   REQUEST_ADD_TO_GROUP,
   REQUEST_ADD_TO_GROUP_SUCCESS,
   REQUEST_CREATEGROUP,
   REQUEST_CREATEGROUP_SUCCESS,
   REQUEST_FETCH_GROUP,
   REQUEST_FETCH_GROUP_SUCCESS,
   REQUEST_GROUP_FAILED
} from '../actions'
import {
   FirebaseService
} from '../api'
const firebaseService = new FirebaseService()

export function* watchRequestAddToGroup() {
   yield call(takeEvery, REQUEST_ADD_TO_GROUP, requestAddToGroupFlow)
}

export function* watchRequestCreateGroup() {
   yield call(takeEvery, REQUEST_CREATEGROUP, requestCreateGroupFlow)
}

export function* watchRequestFetchGroup() {
   yield call(takeEvery, REQUEST_FETCH_GROUP, requestFetchGroupFlow)
}

export function* requestAddToGroupFlow(action) {
   try {
      yield call(firebaseService.requestAddToGroup, action.groupName, action.userName)
      yield put({
         type: REQUEST_ADD_TO_GROUP_SUCCESS
      })
   } catch (error) {
      yield put({
         type: REQUEST_GROUP_FAILED,
         error
      })
   }
}

export function* requestCreateGroupFlow(action) {
   try {
      yield call(firebaseService.requestCreateGroup, action.groupName, action.userName, action.expiredTime, action.startPosition, action.endPosition)
      yield put({
         type: REQUEST_CREATEGROUP_SUCCESS,
      })

   } catch (error) {
      yield put({
         type: REQUEST_GROUP_FAILED,
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
         type: REQUEST_GROUP_FAILED,
         error
      })
   }
}
