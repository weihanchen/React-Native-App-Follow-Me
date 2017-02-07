import {
   watchRequestCheckIdentity,
   watchRequestIdentify
} from './identify'
import {
   watchRequestAddToGroup,
   watchRequestCreateGroup,
   watchRequestFetchGroup,
   watchRequestLeaveGroup
} from './group'
import {
   watchRequestGeocoding
} from './geocoding'
import {
   watchRequestGeolocation
} from './location'
import {
  watchRequestMarkerActiveDirection,
   watchRequestTravelDirections,
   watchRequestTravelInit,
   watchRequestTravelUpdateCoordinate
} from './travel'
import {
   watchRequestFetchUser
} from './user'

export default function* rootSaga() {
   yield [
      watchRequestAddToGroup(),
      watchRequestCheckIdentity(),
      watchRequestCreateGroup(),
      watchRequestFetchGroup(),
      watchRequestFetchUser(),
      watchRequestGeolocation(),
      watchRequestGeocoding(),
      watchRequestIdentify(),
      watchRequestLeaveGroup(),
      watchRequestMarkerActiveDirection(),
      watchRequestTravelDirections(),
      watchRequestTravelInit(),
      watchRequestTravelUpdateCoordinate()
   ]
}
