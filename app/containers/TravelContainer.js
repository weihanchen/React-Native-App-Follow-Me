'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//actions
import {
   changeTravelMode,
   requestFetchTravelInit,
   requestGeolocation,
   requestIdentify,
   requestLeaveGroup,
   requestTravelDirections,
   requestTravelUpdateCoordinate,
   updateMarkerActiveDirection,
   updateTravelMarkers,
   updateTravelRegion
} from '../actions'
//components
import {
   Alert,
   InteractionManager,
   View,
   Text,
   ToastAndroid,
   StyleSheet,
   Vibration
} from 'react-native'
import {SideMenu} from 'react-native-elements'
const PushNotification = require('react-native-push-notification');
import {TravelMap, TravelMenu} from '../components/Travel'
import MenuContainer from './MenuContainer'
//config
import {ERROR_MESSAGE, LANGUAGE_KEY} from '../config'
//service
import {FirebaseService} from '../api'
import moment from 'moment'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isMenuOpen: false
      }
   }

   watchID :
      ? number = null
   //Component life circle
   componentDidMount() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      this.props.requestGeolocation()

      PushNotification.configure({
         popInitialNotification: true,
         requestPermissions: true
      })

      firebaseService.onGroupAlertChanged(groupId, (childSnapshot) => {
         const key = childSnapshot.key
         const value = childSnapshot.val()
         const {travel} = this.props
         if (key !== userId) {
            const member = travel.memberMap[key] //判斷isAlerting跟時間發送震動跟通知
            const isAlerting = value.isAlerting
            const timespan = value.timespan
            const now = moment()
            const alertTime = moment(new Date(timespan))
            if (now.diff(alertTime, 'seconds') <= 15) {
               PushNotification.localNotification({
                  bigText: 'Followme',
                  message: `${member.userName}${LANGUAGE_KEY.SENDALERT}`,
               })
            }
         }
      })

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
         distanceFilter: 5,
         timeout: 1000,
         maximumAge: 1000
      })

   }

   componentWillReceiveProps(nextProps) {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const {navigator} = nextProps
      const groupStatusFunc = {
         leave_success: () => {
            InteractionManager.runAfterInteractions(() => {
               navigator.pop()
               this.props.requestIdentify()
            })

         },
         error: (error) => this.errorHandler(error)
      }
      const locationStatusFunc = {
         success: () => this.props.requestFetchTravelInit(nextProps.location.coordinate, userId, groupId),
         error: (error) => this.errorHandler(error)
      }
      const travelStatusFunc = {
         change_mode: () => this.props.requestTravelDirections(nextProps.travel.coordinate, nextProps.travel.activePosition.coordinate, nextProps.travel.mode),
         request_init_success: () => this.props.requestTravelDirections(nextProps.travel.coordinate, nextProps.travel.activePosition.coordinate, nextProps.travel.mode),
         error: (error) => this.errorHandler(error)
      }

      if (groupStatusFunc.hasOwnProperty(nextProps.group.status) && nextProps.group.status != this.props.group.status)
         groupStatusFunc[nextProps.group.status](nextProps.group.error)

      if (locationStatusFunc.hasOwnProperty(nextProps.location.status) && nextProps.location.status != this.props.location.status)
         locationStatusFunc[nextProps.location.status](nextProps.location.error)

      if (travelStatusFunc.hasOwnProperty(nextProps.travel.status) && nextProps.travel.status != this.props.travel.status)
         travelStatusFunc[nextProps.travel.status](nextProps.travel.error)
   }

   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
   }

   //Event handler
   confirmLeaveGroup() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const isLeader = this.props.travel.isLeader
      this.props.requestLeaveGroup(groupId, userId, isLeader)
   }

   errorHandler(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT)
   }

   handleChangeMode(mode) {
      this.props.changeTravelMode(mode)
   }

   handleLeaveGroup() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      const isLeader = this.props.travel.isLeader
      const alertTitle = LANGUAGE_KEY.LEAVE_GROUP
      let alertBody = `${LANGUAGE_KEY.LEAVE_GROUP_CONFIRM_TIP}?`
      const alertFooter = [
         {
            text: LANGUAGE_KEY.CANCEL
         }, {
            text: LANGUAGE_KEY.CONFIRM_LEAVE,
            onPress: this.confirmLeaveGroup.bind(this)
         }
      ]
      if (isLeader)
         alertBody = `${LANGUAGE_KEY.LEAVE_GROUP_WHEN_LEADER_TIP}，${alertBody}`
      Alert.alert(alertTitle, alertBody, alertFooter)
   }

   handleNavigateToMarker(marker) {
      this.props.updateMarkerActiveDirection(this.props.travel.coordinate, this.props.travel.markers, marker, this.props.travel.mode)
   }

   handleRequestDirection() {
      this.props.requestTravelDirections(this.props.travel.coordinate, this.props.travel.activePosition.coordinate, this.props.travel.mode)
   }

   handleRequestRegion() {
      this.props.updateTravelRegion(this.props.travel.coordinate)
   }

   handleToggleSideMenu() {
      this.setState({
         isMenuOpen: !this.state.isMenuOpen
      })
   }

   render() {
      const {travel} = this.props
      const menu = (
         <TravelMenu handleLeaveGroup={this.handleLeaveGroup.bind(this)} handleNavigateToMarker={this.handleNavigateToMarker.bind(this)} handleToggleSideMenu={this.handleToggleSideMenu.bind(this)} isMenuOpen={this.state.isMenuOpen} travel={travel}></TravelMenu>
      )
      return (
         <SideMenu isOpen={this.state.isMenuOpen} menu={menu} onChange={(isMenuOpen) => {
            if (this.state.isMenuOpen != isMenuOpen)
               this.setState({isMenuOpen})
         }}>
            <TravelMap handleChangeMode={this.handleChangeMode.bind(this)} handleRequestDirection={this.handleRequestDirection.bind(this)} handleRequestRegion={this.handleRequestRegion.bind(this)} handleToggleSideMenu={this.handleToggleSideMenu.bind(this)} travel={travel}></TravelMap>
         </SideMenu>
      )
   }
}

const mapStateToProps = (state) => {
   return {group: state.group, travel: state.travel, location: state.location}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      changeTravelMode,
      requestFetchTravelInit,
      requestGeolocation,
      requestIdentify,
      requestLeaveGroup,
      requestTravelDirections,
      requestTravelUpdateCoordinate,
      updateMarkerActiveDirection,
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
   requestLeaveGroup: PropTypes.func,
   requestIdentify: PropTypes.func,
   requestGeolocation: PropTypes.func,
   requestTravelUpdateCoordinate: PropTypes.func,
   travel: PropTypes.object,
   updateMarkerActiveDirection: PropTypes.func,
   updateTravelMarkers: PropTypes.func,
   updateTravelRegion: PropTypes.func,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
