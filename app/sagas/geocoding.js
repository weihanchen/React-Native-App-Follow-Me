import {
    takeEvery
} from 'redux-saga'
import {
    put,
    call
} from 'redux-saga/effects'
import {
    REQUEST_FAILED,
    REQUEST_GEOCODING,
    REQUEST_GEOCODING_SUCCESS
} from '../actions'
import {
    LocationService
} from '../api'

export function* watchRequestGeocoding() {
    yield call(takeEvery, REQUEST_GEOCODING, requestGeocodingFlow)
}

export function* requestGeocodingFlow(action) {
    try {
        const locationService = new LocationService()
        const geocoding = yield call(locationService.requestGeocoding, action.address)
        yield put({
            type: REQUEST_GEOCODING_SUCCESS,
            geocoding
        })
    } catch (error) {
        yield put({
            type: REQUEST_FAILED,
            error
        })
    }
}
