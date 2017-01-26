'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {Button, Dimensions, Text, TextInput, TouchableOpacity, View} from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FoundationIcon from 'react-native-vector-icons/Foundation'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TravelMap extends Component {
   constructor(props) {
      super(props)
      this.state = {
        region: {
          latitude: 23.59696570338207,
          longitude: 120.45780305184569,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      }
   }

   componentWillReceiveProps(nextProps) {
     if (nextProps.travel.status != this.props.travel.status && nextProps.travel.status === 'update_region') {
        const region = Object.assign({}, this.state.region, nextProps.travel.region)
        this.setState({region})
     }
   }

   onChangeMode(mode) {
     this.props.handleChangeMode(mode)
   }

   onLocated() {
      this.props.handleRequestRegion()
   }

   onRequestDirection() {
      this.props.handleRequestDirection()
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <MapView style={styles.map} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
               <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.skyblue}></Polyline>
               {travel.markers.map(marker => _markerSection(marker))}
            </MapView>
            <View style={styles.modeContainer}>
              <TouchableOpacity style={_getModeStyle(travel.mode, 'driving')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'driving')}>
                <FontAwesomeIcon name="car" style={styles.modeButtonIcon}></FontAwesomeIcon>
              </TouchableOpacity>
              <TouchableOpacity style={_getModeStyle(travel.mode, 'bicycling')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'bicycling')}>
                <FontAwesomeIcon name="bicycle" style={styles.modeButtonIcon}></FontAwesomeIcon>
              </TouchableOpacity>
              <TouchableOpacity style={_getModeStyle(travel.mode, 'walking')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this,'walking')}>
                <FontAwesomeIcon name="male" style={styles.modeButtonIcon}></FontAwesomeIcon>
              </TouchableOpacity>
            </View>
            <View style={styles.toolContainer}>
               <TouchableOpacity style={[styles.toolButton, styles.toolButtonAlert]} activeOpacity={0.6}>
                  <FontAwesomeIcon name="bell" style={[styles.toolButtonIcon, styles.toolButtonIconAlert]}></FontAwesomeIcon>
               </TouchableOpacity>
               <TouchableOpacity style={styles.toolButton} activeOpacity={0.6} onPress={this.onRequestDirection.bind(this)}>
                  <FontAwesomeIcon name="location-arrow" style={styles.toolButtonIcon}></FontAwesomeIcon>
               </TouchableOpacity>
               <TouchableOpacity style={styles.toolButton} activeOpacity={0.6} onPress={this.onLocated.bind(this)}>
                  <FontAwesomeIcon name="arrows" style={styles.toolButtonIcon}></FontAwesomeIcon>
               </TouchableOpacity>
            </View>
         </View>
      )
   }
}

//private methods
const _getModeStyle = (activeMode, currentMode) => {
   const results = [styles.modeButton]
   if (activeMode === currentMode) results.push(styles.modeButtonActive)
   return results
}

const _markerSection = (marker) => {
   const renderType = {
      self: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='circle' style={styles.memberText}/>
         </View>
      ),
      member: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='user' style={styles.memberText}/>
            <Text style={styles.memberText}>{marker.username}</Text>
         </View>
      ),
      leader: () => (
         <View style={styles.member}>
            <FoundationIcon name="crown" style={styles.leaderText}></FoundationIcon>
            <Text style={styles.leaderText}>{marker.username}</Text>
         </View>
      ),
      endPosition: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='flag' style={styles.endText}/>
            <Text style={styles.endText}>終點</Text>
         </View>
      )
   }
   return (
      <Marker {...marker}>
         {renderType[marker.type]()}
      </Marker>
   )
}

TravelMap.propTypes = {
   handleChangeMode: PropTypes.func,
   handleRequestDirection: PropTypes.func,
   handleRequestRegion: PropTypes.func,
   travel: PropTypes.object
}

export default TravelMap
