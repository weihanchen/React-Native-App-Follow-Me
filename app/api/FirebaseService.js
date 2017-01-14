import * as Firebase from 'firebase'
import {AsyncStorage} from 'react-native'
import {ERROR_MESSAGE} from '../config'
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
               reject(ERROR_MESSAGE.GROUP_EXIST)
            resolve()
         })
      }).then(() => userRef.set(user)).then(() => groupRef.set(group)).then(() => AsyncStorage.setItem('groupId', groupId)).then(() => AsyncStorage.setItem('userId', userId))
   }

   requestFetchGroup(groupId) {
      const groupRef = Firebase.database().ref(`groups/${groupId}`)
      return groupRef.once('value').then(snapshot => {
         const isExist = snapshot.exists()
         if (!isExist)
            throw ERROR_MESSAGE.GROUP_NOT_EXIST
         return snapshot.val()
      })
   }

   requestFetchUser(userId) {
      const userRef = Firebase.database().ref(`users/${userId}`)
      return userRef.once('value').then(snapshot => {
         const isExist = snapshot.exists()
         if (!isExist)
            throw ERROR_MESSAGE.USER_NOT_EXIST
         return snapshot.val()
      })
   }
}
