import * as Firebase from 'firebase'
const firebaseConfig = {
    databaseUrl: 'https://willapp.firebaseio.com'
}
Firebase.initializeApp(firebaseConfig)
export default class FirebaseService {
  constructor() {
    this.rootRef = Firebase.ref('followme')
  }

  requestCreateGroup(groupName, startPosition, endPosition, leader) {

  }
}
