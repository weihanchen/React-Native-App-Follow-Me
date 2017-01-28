'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, ToastAndroid, StyleSheet} from 'react-native'
//actions
import {changeTravelMode, requestFetchTravelInit, requestGeolocation, requestTravelDirections, requestTravelUpdateCoordinate,updateTravelMarkers, updateTravelRegion} from '../actions'
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
   }

   watchID :
      ? number = null

   componentDidMount() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      this.props.requestGeolocation()

      firebaseService.onGroupMembersChanged(groupId, (childSnapshot) => {
          const key = childSnapshot.key
          const value = childSnapshot.val()
          const coordinate = value.coordinate
          this.props.updateTravelMarkers(this.props.travel.markers, key, coordinate)
      })


      this.watchID = navigator.geolocation.watchPosition((position) => {
         const coordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         }
         this.props.requestTravelUpdateCoordinate(groupId, userId, coordinate)
      }, (error) => ToastAndroid.show(ERROR_MESSAGE.POSITION_ERROR, ToastAndroid.SHORT), {
         enableHighAccuracy: true,
         distanceFilter: 2,
         timeout: 1000,
         maximumAge: 1000
      })

   }

   componentWillReceiveProps(nextProps) {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const locationStatusFunc = {
         success: () => this.props.requestFetchTravelInit(userId, groupId),
         error: (error) => ToastAndroid.show(error, ToastAndroid.SHORT)
      }
      const travelStatusFunc = {
         request_init_success: () => this.props.requestTravelDirections(nextProps.travel.coordinate, nextProps.travel.endPosition.coordinate, nextProps.travel.mode),
         error: (error) => ToastAndroid.show(error, ToastAndroid.SHORT)
      }

      if (locationStatusFunc.hasOwnProperty(nextProps.location.status) && nextProps.location.status != this.props.location.status)
         locationStatusFunc[nextProps.location.status](nextProps.location.error)

      if (travelStatusFunc.hasOwnProperty(nextProps.travel.status) && nextProps.travel.status != this.props.travel.status)
         travelStatusFunc[nextProps.travel.status](nextProps.travel.error)
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
   }

   handleChangeMode(mode) {
      this.props.changeTravelMode(mode)
      this.handleRequestDirection()
   }

   handleRequestDirection() {
     this.props.requestTravelDirections(this.props.travel.coordinate, this.props.travel.endPosition.coordinate, this.props.travel.mode)
   }

   handleRequestRegion() {
     this.props.updateTravelRegion(this.props.travel.coordinate)
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <TravelMap travel={travel}
                       handleRequestDirection={this.handleRequestDirection.bind(this)}
                       handleRequestRegion={this.handleRequestRegion.bind(this)}
                       handleChangeMode={this.handleChangeMode.bind(this)}  >
            </TravelMap>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, travel: state.travel, user: state.user, location: state.location}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      changeTravelMode,
      requestFetchTravelInit,
      requestGeolocation,
      requestTravelDirections,
      requestTravelUpdateCoordinate,
      updateTravelMarkers,
      updateTravelRegion
   }, dispatch)
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})

TravelContainer.propTypes = {
   changeTravelMode: PropTypes.func,
   group: PropTypes.object,
   groupId: PropTypes.string,
   requestDirections: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   requestGeolocation: PropTypes.func,
   requestTravelUpdateCoordinate: PropTypes.func,
   travel: PropTypes.object,
   updateTravelMarkers: PropTypes.func,
   updateTravelRegion: PropTypes.func,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
