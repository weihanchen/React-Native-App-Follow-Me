import {
   REQUEST_ADD_TO_GROUP,
   REQUEST_ADD_TO_GROUP_SUCCESS,
   REQUEST_CREATEGROUP,
   REQUEST_CREATEGROUP_SUCCESS,
   REQUEST_FETCH_GROUP,
   REQUEST_FETCH_GROUP_SUCCESS,
   REQUEST_GROUP_FAILED
} from '../actions';

export default function group(state = {
   error: null,
   status: 'init'
}, action) {
   console.log(action.type)
   switch (action.type) {
      case REQUEST_ADD_TO_GROUP:
         return Object.assign({}, state, {
            status: 'loading'
         })
         break
      case REQUEST_ADD_TO_GROUP_SUCCESS:
         return Object.assign({}, state, {
            status: 'add_success'
         })
         break
      case REQUEST_CREATEGROUP:
         return Object.assign({}, state, {
            status: 'loading'
         })
         break
      case REQUEST_CREATEGROUP_SUCCESS:
         return Object.assign({}, state, {
            status: 'create_success'
         })
         break
      case REQUEST_FETCH_GROUP:
         return Object.assign({}, state, {
            status: 'loading'
         })
         break
      case REQUEST_FETCH_GROUP_SUCCESS:
         return Object.assign({}, state, {
            status: 'fetch_success'
         }, action.group)
         break
      case REQUEST_GROUP_FAILED:
         return Object.assign({}, state, {
            status: 'error',
            error: action.error
         })
         break
      default:
         return state
   }
}
