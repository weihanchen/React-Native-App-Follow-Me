'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, ToastAndroid, StyleSheet} from 'react-native'
//actions
import {requestTravelDirections, requestTravelRegion, requestFetchTravelMarkers, requestGeolocation} from '../actions'
//components
import {TravelMap} from '../components/Travel'
//config
import {ERROR_MESSAGE} from '../config'
//service
import {FirebaseService} from '../api'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         currentUser: {},
         direction: {},
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
         this.setState({
           leaderId: group.leader,
           memberIdList: group.members,
           endPosition: group.endPosition,
           direction: group.endPosition
         })
         return firebaseService.requestFetchUser(userId)
      }).then(user => {
         this.setState({
           currentUser: user
         })
         this.props.requestFetchTravelMarkers(this.state.currentUser, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
         this.props.requestGeolocation()
         firebaseService.onGroupChanged(groupId, () => {
            return this.props.requestFetchTravelMarkers(this.state.currentUser, this.state.leaderId, this.state.memberIdList, this.state.endPosition)
         })
      }).catch(error => console.log(error))

      this.watchID = navigator.geolocation.watchPosition((position) => {
         const coordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         }
         const currentUser = Object.assign({}, this.state.currentUser, {coordinate})
         this.setState({
           currentUser: currentUser
         })
         firebaseService.updateCoordinate(groupId, userId, coordinate)
      }, (error) => ToastAndroid.show(ERROR_MESSAGE.POSITION_ERROR, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         distanceFilter: 2,
         timeout: 1000,
         maximumAge: 1000
      })

   }

   componentWillReceiveProps(nextProps) {
      const locationStatusFun = {
        success: () => {
          this.props.requestTravelDirections(nextProps.location.coordinate, this.state.endPosition.coordinate, 'car')
          this.props.requestTravelRegion(nextProps.location.coordinate)
        }, //todo: change mode dynamic
        error: (error) => ToastAndroid.show(error, ToastAndroid.SHORT)
      }
      if (locationStatusFun.hasOwnProperty(nextProps.location.status) && nextProps.location.status != this.props.location.status)
         locationStatusFun[nextProps.location.status](nextProps.location.error)
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
   }

   handleRequestDirection() {
     this.props.requestTravelDirections(this.state.currentUser.coordinate, this.state.endPosition.coordinate, 'car')
   }

   handleRequestRegion() {
     this.props.requestTravelRegion(this.props.location.coordinate)
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <TravelMap travel={travel} handleRequestDirection={this.handleRequestDirection.bind(this)} handleRequestRegion={this.handleRequestRegion.bind(this)}></TravelMap>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, travel: state.travel, user: state.user, location: state.location}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestFetchTravelMarkers,
      requestGeolocation,
      requestTravelDirections,
      requestTravelRegion,
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
   requestDirections: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   requestGeolocation: PropTypes.func,
   travel: PropTypes.object,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
