import {
    watchRequestGeolocation
} from './location'
export default function* rootSaga() {
    yield [watchRequestGeolocation()]
}
