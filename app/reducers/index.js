import {
	combineReducers
} from 'redux'
import geocoding from './geocoding'
import group from './group'
import location from './location'


export default combineReducers({
	geocoding,
	group,
	location
})
