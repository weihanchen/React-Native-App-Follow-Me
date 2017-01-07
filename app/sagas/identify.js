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
      const isIdentify = yield call(storageService.checkIdExist)
      if (isIdentify) {
        yield put({
          type: CHECK_IDENTIFY_SUCCESS
        })
      }else  throw new Error('not identity');
   } catch (error) {
      yield put({
         type: CHECK_IDENTIFY_FAILED,
         error
      })
   }
}
