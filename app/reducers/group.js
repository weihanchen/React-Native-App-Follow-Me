import {
  REQUEST_CREATEGROUP,
  REQUEST_CREATEGROUP_FAILED,
  REQUEST_CREATEGROUP_SUCCESS
} from '../actions';

export default function group(state = {
  error: null,
  status: 'init'
}, action) {
  switch (action.type) {
    case REQUEST_CREATEGROUP:
      return Object.assign({}, state, {
          status: 'loading'
      })
      break
    case REQUEST_CREATEGROUP_FAILED:
      return Object.assign({}, state, {
          status: 'error',
          error: action.error
      })
      break
    case REQUEST_CREATEGROUP_SUCCESS:
      return Object.assign({}, state, {
          status: 'create_success'
      })
      break
    default:
      return state;
  }
}
