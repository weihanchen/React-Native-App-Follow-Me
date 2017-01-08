import {
   takeEvery
} from 'redux-saga'
import {
   put,
   call
} from 'redux-saga/effects'

import {
   CHECK_IDENTIFY,
   CHECK_IDENTIFY_FAILED,
   CHECK_IDENTIFY_SUCCESS
} from '../actions'

import {
   StorageService
} from '../api'
const storageService = new StorageService()

export function* watchRequestCheckIdentity() {
   yield call(takeEvery, CHECK_IDENTIFY, requestCheckIdentityFlow)
}

export function* requestCheckIdentityFlow() {
   try {
      const identify = yield call(storageService.checkIdExist)
      if (identify.isIdentify) {
        yield put({
          type: CHECK_IDENTIFY_SUCCESS,
          identify
        })
      }else  throw new Error('not identify');
   } catch (error) {
      yield put({
         type: CHECK_IDENTIFY_FAILED,
         error
      })
   }
}
