import * as Firebase from 'firebase'
const firebaseConfig = {
    databaseUrl: 'https://followmeapp-50e32.firebaseio.com/'
}
Firebase.initializeApp(firebaseConfig)
export default class FirebaseService {
  constructor() {
    this.rootRef = Firebase.ref('followme')
  }

  requestCreateGroup(groupName, username, expiredTime, startPosition, endPosition) {
      const groupsNode = this.rootRef.child('groups')
      const usersNode = this.rootRef.child('users')
      const group = {
        groupName, username, expiredTime, startPosition, endPosition
      }
      return groupsNode.push(group)
  }
}
