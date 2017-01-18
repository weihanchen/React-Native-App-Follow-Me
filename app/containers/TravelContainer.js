'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, ToastAndroid, StyleSheet} from 'react-native'
//actions
import {requestFetchGroup, requestFetchTravelMarkers, requestFetchUser} from '../actions'
//components
import {TravelMap} from '../components/Travel'
//service
import {FirebaseService} from '../api'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         currentUser: {

         },
         currentUid: '',
         endPosition: {

         },
         groupId: '',
         leaderId: '',
         memberIdList: []
      }
   }

   watchID :
      ? number = null

   componentDidMount() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      this.state.groupId = groupId
      this.props.requestFetchGroup(groupId)
      this.props.requestFetchUser(userId)
      this.watchID = navigator.geolocation.watchPosition((position) => {
         const coordinate = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
         }
         this.state.currentUser.coordinate = coordinate
         console.log(userId)
         firebaseService.updateCoordinate(this.state.groupId, userId, coordinate)
      }, (error) => ToastAndroid.show(error.message, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         distanceFilter: 5,
         timeout: 100,
         maximumAge: 0
      })
      firebaseService.onGroupChanged(groupId, () => {
        console.log(this.state.currentUser)
        return this.props.requestFetchTravelMarkers(this.state.currentUser, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
      })
      firebaseService.onUserAdded(() => {
        this.props.requestFetchGroup(groupId)
      })
   }

   componentWillReceiveProps(nextProps) {
      const nextGroupStatus = nextProps.group.status
      const nextUserStatus = nextProps.user.status
      const thisGroupStatus = this.props.group.status
      const thisUserStatus = this.props.user.status

      if (nextGroupStatus === 'fetch_success' &&  nextUserStatus === 'fetch_success') {
         this.state.currentUser = nextProps.user
         this.state.leaderId = nextProps.group.leader
         this.state.memberIdList = nextProps.group.members
         this.state.endPosition = nextProps.group.endPosition
        //  this.props.requestFetchTravelMarkers(this.state.currentUser, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
      }
   }

   componentWillUnmount() {
     console.log('unmount')
      navigator.geolocation.clearWatch(this.watchID)
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <TravelMap travel={travel}></TravelMap>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, travel: state.travel, user: state.user}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestFetchGroup,
      requestFetchTravelMarkers,
      requestFetchUser
   }, dispatch)
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

TravelContainer.propTypes = {
   group: PropTypes.object,
   groupId: PropTypes.string,
   requestFetchGroup: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   requestFetchUser: PropTypes.func,
   travel: PropTypes.object,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
