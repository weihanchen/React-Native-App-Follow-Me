import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'

import {
   IDENTIFY_FAILED,
   REQUEST_IDENTIFY,
   REQUEST_IDENTIFY_SUCCESS
} from '../actions'

import {
   StorageService
} from '../api'
const storageService = new StorageService()

export function* watchRequestIdentify() {
   yield call(takeEvery, REQUEST_IDENTIFY, requestIdentifyFlow)
}

export function* requestIdentifyFlow() {
   try {
      const identify = yield call(storageService.getId)
      yield put({
         type: REQUEST_IDENTIFY_SUCCESS,
         identify
      })
   } catch (error) {
      yield put({
         type: IDENTIFY_FAILED,
         error
      })
   }
}
