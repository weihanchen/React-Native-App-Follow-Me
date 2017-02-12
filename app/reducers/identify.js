import {
   IDENTIFY_FAILED,
   REQUEST_IDENTIFY,
   REQUEST_IDENTIFY_SUCCESS
} from '../actions'

export default function identify(state = {
   error: null,
   groupId: '',
   isIdentify: false,
   userId: '',
   status: 'init'
}, action) {
   switch (action.type) {
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
            isIdentify: action.identify.isIdentify,
            userId: action.identify.userId
         })
         break
      default:
         return state
   }
}
