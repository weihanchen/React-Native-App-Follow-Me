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

   onUserAdded(callback) {
      const usersRef = Firebase.database().ref('users')
      usersRef.on('child_added', callback)
   }

   requestCreateGroup(groupname, username, expiredTime, startPosition, endPosition) {
      const groupId = `${groupname}`
      const userId = `${groupname}-${username}`
      const groupRef = Firebase.database().ref(`groups/${groupId}`)
      const userRef = Firebase.database().ref(`users/${userId}`)
      const group = Object.assign({}, {
         groupname,
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
         const members = value.hasOwnProperty('members')? Object.keys(value.members): []
         if (!isExist)
            throw ERROR_MESSAGE.GROUP_NOT_EXIST
         return Object.assign({}, value, {
            members
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

   updateCoordinate(groupId, userId, coordinate) {
      const updates= {}
      updates[`groups/${groupId}/updatedTime`] = new Date().getTime()
      updates[`users/${userId}/coordinate`] = Object.assign({}, coordinate)
     return Firebase.database().ref().update(updates)
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
