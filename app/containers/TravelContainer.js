'use strict'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, StyleSheet} from 'react-native'
//actions
import {requestFetchGroup, requestFetchTravelMarkers} from '../actions'
//components
import {TravelMap} from '../components/Travel'
//service
import {FirebaseService} from '../api'

const firebaseService = new FirebaseService()

class TravelContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         memberIdList: [],
         leaderId: '',
         currentUid: ''
      }
   }

   watchID :
      ? number = null

   componentDidMount() {
      this.state.currentUid = this.props.userId
      const groupId = this.props.groupId
      this.props.requestFetchGroup(groupId)
      this.watchID = navigator.geolocation.watchPosition((position) => {
         let lastPosition = JSON.stringify(position)
         console.log(lastPosition)
      }, (error) => console.log(error), {
         enableHighAccuracy: true,
         timeout: 1000,
         maximumAge: 1000
      })
      firebaseService.onGroupChanged(groupId, () => {
        return this.props.requestFetchTravelMarkers(this.state.currentUid, this.state.leaderId, this.state.memberIdList)
      })
      firebaseService.onUserAdded(() => {
        this.props.requestFetchGroup(groupId)
      })
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.group.status != nextProps.group.status && nextProps.group.status === 'request_success') {
         this.state.leaderId = nextProps.group.leader
         this.state.memberIdList = nextProps.group.members
         this.props.requestFetchTravelMarkers(this.state.currentUid, this.state.leaderId, this.state.memberIdList)
      }
   }

   componentWillUnmount() {
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
   return {group: state.group, travel: state.travel}
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      requestFetchGroup,
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
   requestFetchGroup: PropTypes.func,
   requestFetchTravelMarkers: PropTypes.func,
   travel: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelContainer)
