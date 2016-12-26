'use strict'
import {
    REQUEST_FAILED,
    REQUEST_GEOCODING,
    REQUEST_GEOCODING_SUCCESS
} from '../actions'
const geocoding = (state = {
    error: null,
    coordinate: null,
    status: 'init'
}, action) => {
    switch (action.type) {
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                status: 'error',
                error: action.error
            })
            break
        case REQUEST_GEOCODING:
            return Object.assign({}, state, {
                status: 'loading',
                error: null
            })
            break
        case REQUEST_GEOCODING_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                coordinate: action.geocoding
            })
            break
        default:
            return state
    }
}
export default geocoding
