'use strict'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//actions
import {
   changeTravelMode,
   removeMember,
   requestAddTravelMember,
   requestFetchTravelInit,
   requestGeolocation,
   requestIdentify,
   requestLeaveGroup,
   requestTravelDirections,
   requestTravelUpdateAlerting,
   requestTravelUpdateCoordinate,
   updateMarkerActiveDirection,
   updateMarkerAlerting,
   updateMarkerCoordinate,
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
import { SideMenu } from 'react-native-elements'
const PushNotification = require('react-native-push-notification');
import { TravelMap, TravelMenu } from '../components/Travel'
import MenuContainer from './MenuContainer'
//config
import { ERROR_MESSAGE, LANGUAGE_KEY } from '../config'
//service
import { FirebaseService } from '../api'
import moment from 'moment'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isMenuOpen: false,
         hasInitialized: false
      }
      this.watchID = null
   }

   //Component life circle
   componentDidMount() {
      const groupId = this.props.groupId
      const userId = this.props.userId
      this.props.requestGeolocation()

      PushNotification.configure({ popInitialNotification: true, requestPermissions: true })

      firebaseService.onGroupAlertChanged(groupId, (childSnapshot) => {
         const key = childSnapshot.key
         const value = childSnapshot.val()
         const { travel } = this.props
         const member = travel.memberMap[key]
         if (key !== userId && member) {
            const isAlerting = value.isAlerting
            const timespan = value.timespan
            const now = moment()
            const alertTime = moment(new Date(timespan))
            this.props.updateMarkerAlerting(this.props.travel.markers, key, isAlerting)
            if (now.diff(alertTime, 'seconds') <= 15) {
               PushNotification.localNotification({ bigText: 'Followme', message: `${member.userName}${LANGUAGE_KEY.SENDALERT}` })
            }
         }
      })

      firebaseService.onGroupMembersAdded(groupId, (childSnapshot) => {
         const { hasInitialized } = this.state
         if (hasInitialized) {
            const key = childSnapshot.key
            const value = childSnapshot.val()
            const member = Object.assign({}, value, { key })
            this.props.requestAddTravelMember(member)
         }
      })

      firebaseService.onGroupMembersChanged(groupId, (childSnapshot) => {
         const key = childSnapshot.key
         const value = childSnapshot.val()
         const coordinate = value.coordinate
         this.props.updateMarkerCoordinate(this.props.travel.markers, key, coordinate)
      })

      firebaseService.onGroupMembersRemoved(groupId, (childSnapshot) => {
         const { markers, memberMap } = this.props.travel
         const { hasInitialized } = this.state
         const key = childSnapshot.key
         const member = memberMap[key]
         if (hasInitialized && userId !== key && member) {
            PushNotification.localNotification({ bigText: 'Followme', message: `${member.userName}${LANGUAGE_KEY.LEAVED_GROUP}` })
            this.props.removeMember(markers, memberMap, key)
         }
      })

      this.watchID = navigator.geolocation.watchPosition((position) => {
         const currentCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
         }
         const { hasInitialized } = this.state

         if (!hasInitialized)
            this.props.requestGeolocation()
         else
            this.props.requestTravelUpdateCoordinate(groupId, userId, currentCoordinate)
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
      const { navigator } = nextProps
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
         request_add_member_success: () => PushNotification.localNotification({ bigText: 'Followme', message: `${nextProps.travel.newMember.userName}${LANGUAGE_KEY.ADDTOGROUP}` }),
         request_init_success: () => {
            this.props.requestTravelDirections(nextProps.travel.coordinate, nextProps.travel.activePosition.coordinate, nextProps.travel.mode)
            this.setState({ hasInitialized: true })
         },
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
      const groupId = this.props.groupId
      navigator.geolocation.clearWatch(this.watchID)
      firebaseService.destroyGroupMemberListener(groupId)
      firebaseService.destroyGroupAlertListener(groupId)
   }

   //Event handler
   confirmLeaveGroup() {
      const {groupId, userId, travel} = this.props
      const isLeader = travel.isLeader
      this.props.requestLeaveGroup(groupId, userId, isLeader)
   }

   errorHandler(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT)
   }

   handleChangeMode(mode) {
      this.props.changeTravelMode(mode)
   }

   handleLeaveGroup() {
      const {groupId, userId, travel} = this.props
      const isLeader = travel.isLeader
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

   handleRequestToggleAlerting(isAlerting) {
      const {groupId, userId} = this.props
      this.props.requestTravelUpdateAlerting(groupId, userId, !isAlerting)
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
      const { travel, userId } = this.props
      const menu = (
         <TravelMenu handleLeaveGroup={this.handleLeaveGroup.bind(this)} handleNavigateToMarker={this.handleNavigateToMarker.bind(this)} handleToggleSideMenu={this.handleToggleSideMenu.bind(this)} isMenuOpen={this.state.isMenuOpen} travel={travel}></TravelMenu>
      )
      return (
         <SideMenu isOpen={this.state.isMenuOpen} menu={menu} onChange={(isMenuOpen) => {
            if (this.state.isMenuOpen != isMenuOpen)
               this.setState({ isMenuOpen })
         }}>
            <TravelMap handleChangeMode={this.handleChangeMode.bind(this)} handleRequestDirection={this.handleRequestDirection.bind(this)}
               handleRequestRegion={this.handleRequestRegion.bind(this)} handleToggleSideMenu={this.handleToggleSideMenu.bind(this)}
               handleRequestToggleAlerting={this.handleRequestToggleAlerting.bind(this)}
               travel={travel} userId={userId}></TravelMap>
         </SideMenu>
      )
   }
}

const mapStateToProps = (state) => {
   return { group: state.group, travel: state.travel, location: state.location }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      changeTravelMode,
      removeMember,
      requestAddTravelMember,
      requestFetchTravelInit,
      requestGeolocation,
      requestIdentify,
      requestLeaveGroup,
      requestTravelDirections,
      requestTravelUpdateAlerting,
      requestTravelUpdateCoordinate,
      updateMarkerActiveDirection,
      updateMarkerAlerting,
      updateMarkerCoordinate,
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
   removeMember: PropTypes.func,
   requestAddTravelMember: PropTypes.func,
   requestDirections: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   requestLeaveGroup: PropTypes.func,
   requestIdentify: PropTypes.func,
   requestGeolocation: PropTypes.func,
   requestTravelUpdateAlerting: PropTypes.func,
   requestTravelUpdateCoordinate: PropTypes.func,
   travel: PropTypes.object,
   updateMarkerActiveDirection: PropTypes.func,
   updateMarkerAlerting: PropTypes.func,
   updateMarkerCoordinate: PropTypes.func,
   updateTravelRegion: PropTypes.func,
   user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
