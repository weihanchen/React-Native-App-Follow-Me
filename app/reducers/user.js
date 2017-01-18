import {
   REQUEST_FETCH_USER,
   REQUEST_FETCH_USER_FAILED,
   REQUEST_FETCH_USER_SUCCESS
} from '../actions'

const user = (state = {
   error: null,
   status: 'init',
   username: '',
   coordinate: {}
}, action) => {
   switch (action.type) {
      case REQUEST_FETCH_USER:
         return Object.assign({}, state, {
            status: 'loading',
            error: null
         })
         break
      case REQUEST_FETCH_USER_FAILED:
         return Object.assign({}, state, {
            status: 'error',
            error: action.error
         })
         break
      case REQUEST_FETCH_USER_SUCCESS:
         return Object.assign({}, state, {
            status: 'fetch_success',
         }, action.user)
         break
      default:
        return state
   }
}

export default user
