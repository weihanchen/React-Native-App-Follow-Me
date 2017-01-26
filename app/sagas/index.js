import {
   watchRequestCheckIdentity
} from './identify'
import {
   watchRequestCreateGroup,
   watchRequestFetchGroup
} from './group'
import {
   watchRequestGeocoding
} from './geocoding'
import {
   watchRequestGeolocation
} from './location'
import {
   watchRequestTravelDirections,
   watchRequestTravelMarkers,
   watchRequestTravelUpdateCoordinate
} from './travel'
import {
   watchRequestFetchUser
} from './user'

export default function* rootSaga() {
   yield [
      watchRequestCheckIdentity(),
      watchRequestCreateGroup(),
      watchRequestFetchGroup(),
      watchRequestFetchUser(),
      watchRequestGeolocation(),
      watchRequestGeocoding(),
      watchRequestTravelDirections(),
      watchRequestTravelMarkers(),
      watchRequestTravelUpdateCoordinate()
   ]
}
