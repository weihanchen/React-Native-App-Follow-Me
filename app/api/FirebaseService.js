import * as Firebase from 'firebase'
const firebaseConfig = {
    databaseURL: 'https://followmeapp-50e32.firebaseio.com'
}
Firebase.initializeApp(firebaseConfig)
export default class FirebaseService {
    constructor() {}

    requestCreateGroup(groupName, username, expiredTime, startPosition, endPosition) {
        const groupId = `${groupName}`
        const userId = `${groupName}-${username}`
        const groupRef = Firebase.database().ref(`groups/${groupId}`)
        const userRef =  Firebase.database().ref(`users/${userId}`)
        const group = Object.assign({}, {
          groupName,
          leader: userId,
          expiredTime,
          startPosition,
          endPosition
        })
        const user = Object.assign({}, {
            username
        }, startPosition)
        return groupRef.once('value')
            .then(snapshot => {
                return new Promise((resolve, reject) => {
                    const canCreate = snapshot.val() === null
                    if (!canCreate) reject('該群組名稱已經存在')
                    resolve()
                })
            })
            .then(() => userRef.set(user))
            .then(() => groupRef.set(group))
    }
}
