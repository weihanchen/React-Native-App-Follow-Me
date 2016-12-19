import {
  REQUEST_CREATE_GROUP
} from '../actions';

export default function group(state = {
  error: null,
  status: 'init'
}, action) {
  switch (action.type) {
    case REQUEST_CREATE_GROUP:
      return Object.assign({}, state, {
          status: 'loading'
      })
      break
    default:
      return state;
  }
}
