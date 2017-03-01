import * as Firebase from 'firebase'
import {AsyncStorage} from 'react-native'
import {ERROR_MESSAGE, FIREBASE_ROOT} from '../config'
const firebaseConfig = {
   databaseURL: FIREBASE_ROOT
}
Firebase.initializeApp(firebaseConfig)
class FirebaseService {
   constructor() {
      this.requestFetchGroup = this.requestFetchGroup.bind(this)
   }

   onGroupAlertChanged(groupName, callback) {
      const groupRef = Firebase.database().ref(`groups/${groupName}/alert`)
      groupRef.on('child_changed', callback)
   }

   onGroupMembersAdded(groupName, callback) {
     const groupRef = Firebase.database().ref(`groups/${groupName}/members`)
     groupRef.on('child_added', callback)
   }

   onGroupMembersChanged(groupName, callback) {
      const groupRef = Firebase.database().ref(`groups/${groupName}/members`)
      groupRef.on('child_changed', callback)
   }

   onUserAdded(callback) {
      const usersRef = Firebase.database().ref('users')
      usersRef.on('child_added', callback)
   }

   requestAddToGroup(groupName, userName) {
      const groupId = groupName
      const userId = `${groupName}-${userName}`
      const groupRef = Firebase.database().ref(`groups/${groupId}`)
      const groupMemberRef = Firebase.database().ref(`groups/${groupId}/members/${userId}`)
      const userRef = Firebase.database().ref(`users/${userId}`)
      const user = Object.assign({}, {userName})
      return groupRef.once('value').then(snapshot => {
         return new Promise((resolve, reject) => {
            const canAdd = snapshot.val() !== null
            if (!canAdd)
               reject(ERROR_MESSAGE.GROUP_NOT_EXIST)
            resolve(userRef.once('value'))
         })
      }).then((userSnapshot) => {
         return new Promise((resolve, reject) => {
            const canAdd = userSnapshot.val() === null
            if (!canAdd)
               reject(ERROR_MESSAGE.USER_EXIST)
            resolve()
         })
      }).then(() => groupMemberRef.set({
         coordinate: {
            latitude: 0,
            longitude: 0
         }
      })).then(() => userRef.set(user)).then(() => AsyncStorage.setItem('groupId', groupId)).then(() => AsyncStorage.setItem('userId', userId))
   }

   requestCreateGroup(groupName, userName, expiredTime, startPosition, endPosition) {
      const groupId = `${groupName}`
      const userId = `${groupName}-${userName}`
      const groupRef = Firebase.database().ref(`groups/${groupId}`)
      const userRef = Firebase.database().ref(`users/${userId}`)
      const group = Object.assign({}, {
         alert: {},
         endPosition,
         expiredTime,
         groupName,
         leader: userId,
         members: {},
         startPosition,
         updatedTime: new Date().getTime()
      })
      group.alert[userId] = {
         isAlerting: false,
         timespan: new Date().getTime()
      }
      group.members[userId] = {
         coordinate: startPosition
      }
      const user = Object.assign({}, {userName})
      return groupRef.once('value').then(snapshot => {
         return new Promise((resolve, reject) => {
            const canCreate = snapshot.val() === null
            if (!canCreate)
               reject(ERROR_MESSAGE.GROUP_EXIST)
            resolve()
         })
      }).then(() => userRef.set(user)).then(() => groupRef.set(group)).then(() => AsyncStorage.setItem('groupId', groupId)).then(() => AsyncStorage.setItem('userId', userId))
   }

   requestFetchGroup = (groupId) => (_fetchGroup(groupId))

   requestFetchUser = (userId) => (_fetchUser(userId))

   requestFetchUsers(userIdList) {
      const self = this
      const usersRef = Firebase.database().ref(`users`)
      const promiseArr = []
      userIdList.forEach(userId => promiseArr.push(_fetchUser(userId)))
      return Promise.all(promiseArr)
   }

   requestLeaveGroup(groupId, userId, isLeader) {
      const groupRef = Firebase.database().ref(`groups/${groupId}`)
      const userRef = Firebase.database().ref(`users/${userId}`)
      const groupMemberRef = Firebase.database().ref(`groups/${groupId}/members/${userId}`)
      const leaveSuccess = () => AsyncStorage.removeItem('groupId').then(() => AsyncStorage.removeItem('userId'))
      if (isLeader)
         return groupRef.remove().then(() => userRef.remove()).then(() => leaveSuccess())
      else
         return groupMemberRef.remove().then(() => userRef.remove()).then(() => leaveSuccess())
   }

   updateCoordinate(groupId, userId, coordinate) {
      return _fetchGroup(groupId).then(() => _fetchUser(userId)).then(user => {
         const updates = {}
         updates[`groups/${groupId}/members/${userId}/coordinate`] = Object.assign({}, coordinate)
         return Firebase.database().ref().update(updates)
      })
   }
}

const _fetchGroup = (groupId) => {
  const groupRef = Firebase.database().ref(`groups/${groupId}`)
  return groupRef.once('value').then(snapshot => {
     const isExist = snapshot.exists()
     const value = snapshot.val()
     if (!isExist)
        throw ERROR_MESSAGE.GROUP_NOT_EXIST
     return Object.assign({}, value)
  })
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
