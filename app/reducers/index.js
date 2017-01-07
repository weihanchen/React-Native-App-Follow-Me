import {
	combineReducers
} from 'redux'
import geocoding from './geocoding'
import group from './group'
import identify from './identify'
import location from './location'


export default combineReducers({
	geocoding,
	group,
	identify,
	location
})
