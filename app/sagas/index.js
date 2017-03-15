import {
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
   watchRequestAddTravelMember,
   watchRequestMarkerActiveDirection,
   watchRequestTravelDirections,
   watchRequestTravelInit,
   watchRequestTravelUpdateAlerting,
   watchRequestTravelUpdateCoordinate
} from './travel'
import {
   watchRequestFetchUser
} from './user'

export default function* rootSaga() {
   yield [
      watchRequestAddToGroup(),
      watchRequestAddTravelMember(),
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
      watchRequestTravelUpdateAlerting(),
      watchRequestTravelUpdateCoordinate()
   ]
}
