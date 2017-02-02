import {
   CHECK_IDENTIFY,
   CHECK_IDENTIFY_FAILED,
   CHECK_IDENTIFY_SUCCESS
} from '../actions'

export default function identify(state = {
   error: null,
   status: 'init'
}, action) {
   switch (action.type) {
      case CHECK_IDENTIFY:
         return Object.assign({}, state, {
            status: 'loading'
         })
         break
      case CHECK_IDENTIFY_FAILED:
         return Object.assign({}, state, {
            status: 'error',
            error: action.error
         })
         break
      case CHECK_IDENTIFY_SUCCESS:
         return Object.assign({}, state, {
            status: 'success',
            groupId: action.identify.groupId,
            userId: action.identify.userId
         })
         break
      default:
         return state
   }
}
