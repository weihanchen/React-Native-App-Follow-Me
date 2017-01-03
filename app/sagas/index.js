import {
    watchRequestCreateGroup
} from './group'
import {
    watchRequestGeolocation
} from './location'
import {
    watchRequestGeocoding
} from './geocoding'


export default function* rootSaga() {
    yield [
        watchRequestCreateGroup(),
        watchRequestGeolocation(),
        watchRequestGeocoding()
    ]
}
