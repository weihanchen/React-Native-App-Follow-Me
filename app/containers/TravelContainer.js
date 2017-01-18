'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, ToastAndroid, StyleSheet} from 'react-native'
//actions
import {requestFetchTravelMarkers} from '../actions'
//components
import {TravelMap} from '../components/Travel'
//service
import {FirebaseService} from '../api'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         currentUser: {},
         endPosition: {},
         leaderId: '',
         memberIdList: []
      }
   }

   watchID :
      ? number = null

   componentDidMount() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      firebaseService.requestFetchGroup(groupId).then(group => {
         this.state.leaderId = group.leader
         this.state.memberIdList = group.members
         this.state.endPosition = group.endPosition
         return firebaseService.requestFetchUser(userId)
      }).then(user => {
         this.state.currentUser = user
         this.props.requestFetchTravelMarkers(this.state.currentUser, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
         firebaseService.onGroupChanged(groupId, () => {
            return this.props.requestFetchTravelMarkers(this.state.currentUser, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
         })
      })
      this.watchID = navigator.geolocation.watchPosition((position) => {
         const coordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         }
         this.state.currentUser.coordinate = coordinate
         firebaseService.updateCoordinate(groupId, userId, coordinate)
      }, (error) => ToastAndroid.show(error.message, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         distanceFilter: 2,
         timeout: 100,
         maximumAge: 0
      })

   }

   componentWillReceiveProps(nextProps) {}

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
      requestFetchTravelMarkers
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
   requestFetchTravelMarkers: PropTypes.func,
   travel: PropTypes.object,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
