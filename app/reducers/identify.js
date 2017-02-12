import {
   CHECK_IDENTIFY,
   CHECK_IDENTIFY_SUCCESS,
   IDENTIFY_FAILED,
   REQUEST_IDENTIFY,
   REQUEST_IDENTIFY_SUCCESS
} from '../actions'

export default function identify(state = {
   error: null,
   groupId: '',
   userId: '',
   status: 'init'
}, action) {
   switch (action.type) {
      case CHECK_IDENTIFY:
         return Object.assign({}, state, {
            status: 'loading'
         })
         break
      case CHECK_IDENTIFY_SUCCESS:
         return Object.assign({}, state, {
            status: 'check_success',
            groupId: action.identify.groupId,
            userId: action.identify.userId
         })
         break
      case IDENTIFY_FAILED:
         return Object.assign({}, state, {
            status: 'error',
            error: action.error
         })
         break
      case REQUEST_IDENTIFY:
         return Object.assign({}, state, {
            status: 'loading'
         })
         break
      case REQUEST_IDENTIFY_SUCCESS:
         return Object.assign({}, state, {
            status: 'request_success',
            groupId: action.identify.groupId,
            userId: action.identify.userId
         })
         break
      default:
         return state
   }
}
