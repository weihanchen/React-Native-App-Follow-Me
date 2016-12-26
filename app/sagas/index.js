import {
    watchRequestGeolocation
} from './location'
import {
    watchRequestGeocoding
} from './geocoding'


export default function* rootSaga() {
    yield [watchRequestGeolocation(),
        watchRequestGeocoding()
    ]
}
