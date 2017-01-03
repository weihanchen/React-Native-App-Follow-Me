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
    REQUEST_CREATEGROUP_SUCCESS
} from '../actions'
import {
    FirebaseService
} from '../api'

export function* watchRequestCreateGroup() {
    yield call(takeEvery, REQUEST_CREATEGROUP, requestCreateGroupFlow)
}

export function* requestCreateGroupFlow(action) {
    try {
        const firebaseService = new FirebaseService()
        yield call(firebaseService.requestCreateGroup, action.groupName, action.username, action.expiredTime, action.startPosition, action.endPosition)
        yield put({
            type: REQUEST_CREATEGROUP_SUCCESS
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: REQUEST_CREATEGROUP_FAILED,
            error
        })
    }
}
