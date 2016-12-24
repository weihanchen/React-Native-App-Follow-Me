import {
    takeEvery
} from 'redux-saga'
import {
    put,
    call
} from 'redux-saga/effects'
import {
    REQUEST_FAILED,
    REQUEST_GEOLOCATION,
    REQUEST_GEOLOCATION_SUCCESS
} from '../actions'
import {
    LocationService
} from '../api'

export function* watchRequestGeolocation() {
    yield call(takeEvery, REQUEST_GEOLOCATION, requestGeolocationFlow)
}

export function* requestGeolocationFlow(action) {
    try {
        const locationService = new LocationService()
        const location = yield call(locationService.requestGeolocation)
        yield put({
            type: REQUEST_GEOLOCATION_SUCCESS,
            location
        })
    } catch (error) {
        yield put({
            type: REQUEST_FAILED,
            error
        })
    }
}
