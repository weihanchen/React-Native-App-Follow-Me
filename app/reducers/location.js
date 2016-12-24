import {
    REQUEST_FAILED,
    REQUEST_GEOLOCATION,
    REQUEST_GEOLOCATION_SUCCESS
} from '../actions'

const location = (state = {
    error: null,
    coords: null,
    status: 'init'
}, action) => {
    switch (action.type) {
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                status: 'error',
                error: action.error.message
            })
            break
        case REQUEST_GEOLOCATION:
            return Object.assign({}, state, {
                status: 'loading',
                error: null
            })
            break
        case REQUEST_GEOLOCATION_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                coords: action.location.coords
            })
            break
        default:
            return state
    }
}

export default location
