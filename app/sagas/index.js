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

export default function* rootSaga() {
   yield [
      watchRequestCheckIdentity(),
      watchRequestCreateGroup(),
      watchRequestFetchGroup(),
      watchRequestGeolocation(),
      watchRequestGeocoding()
   ]
}
