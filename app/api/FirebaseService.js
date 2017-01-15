import * as Firebase from 'firebase'
import {AsyncStorage} from 'react-native'
import {ERROR_MESSAGE} from '../config'
const firebaseConfig = {
   databaseURL: 'https://followmeapp-50e32.firebaseio.com'
}
Firebase.initializeApp(firebaseConfig)
class FirebaseService {
   constructor() {}

   onGroupChanged(groupName, callback) {
      const groupRef = Firebase.database().ref(`groups/${groupName}`)
      groupRef.on('child_changed', callback)
   }

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
         username,
         coordinate: {
           latitude: startPosition.latitude,
           longitude: startPosition.longitude
         }
      })
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
         const value = snapshot.val()
         if (!isExist)
            throw ERROR_MESSAGE.GROUP_NOT_EXIST
         return Object.assign({}, value, {
            members: Object.keys(value.members)
         })
      })
   }

   requestFetchUser = (userId) => (_fetchUser(userId))

   requestFetchUsers(userIdList) {
      const self = this
      const usersRef = Firebase.database().ref(`users`)
      const promiseArr = []
      userIdList.forEach(userId => promiseArr.push(_fetchUser(userId)))
      return Promise.all(promiseArr)
   }
}

const _fetchUser = (userId) => {
   const userRef = Firebase.database().ref(`users/${userId}`)
   return userRef.once('value').then(snapshot => {
      const isExist = snapshot.exists()
      if (!isExist)
         throw ERROR_MESSAGE.USER_NOT_EXIST
      return Object.assign({}, snapshot.val(), {key: snapshot.key})
   })
}

export default FirebaseService
