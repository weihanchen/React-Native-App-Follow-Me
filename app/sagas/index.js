import {
   watchRequestCheckIdentity
} from './identify'
import {
   watchRequestCreateGroup
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
      watchRequestGeolocation(),
      watchRequestGeocoding()
   ]
}
