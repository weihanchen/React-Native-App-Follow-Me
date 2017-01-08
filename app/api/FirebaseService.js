import * as Firebase from 'firebase'
import {AsyncStorage} from 'react-native'
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
      const userRef = Firebase.database().ref(`users/${userId}`)
      const group = Object.assign({}, {
         groupName,
         leader: userId,
         expiredTime,
         updatedTime: new Date().getTime(),
         startPosition,
         endPosition
      })
      const user = Object.assign({}, {
         username
      }, startPosition)
      return groupRef.once('value').then(snapshot => {
         return new Promise((resolve, reject) => {
            const canCreate = snapshot.val() === null
            if (!canCreate)
               reject('該群組名稱已經存在')
            resolve()
         })
      }).then(() => userRef.set(user)).then(() => groupRef.set(group)).then(() => AsyncStorage.setItem('groupId', groupId)).then(() => AsyncStorage.setItem('userId', userId))
   }

   requestFetchGroup(groupId) {
      const groupRef = Firebase.database().ref(`groups/${groupId}`)
      return groupRef.once('value').then(snapshot => {
         const isExists = snapshot.exists()
         if (!isExists)
            throw new Error('該群組不存在')
         return snapshot.val()
      })
   }
}
