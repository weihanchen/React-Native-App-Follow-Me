'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {Dimensions, Text, TouchableOpacity, View} from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import Icon from 'react-native-vector-icons/FontAwesome'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'
const screen = Dimensions.get('window')
const ASPECT_RATIO = screen.width / screen.height
const LATITUDE = 23.6010548
const LONGITUDE = 120.4536408
const LATITUDE_DELTA = 0.0122
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TravelMap extends Component {
   constructor(props) {
      super(props)
      this.state = {
         members: [
            {
               key: 'andy',
               coordinate: {
                  latitude: 23.6010548,
                  longitude: 120.4536408
               }
            }, {
               key: 'tina',
               coordinate: {
                  latitude: 23.602298,
                  longitude: 120.451112
               }
            }
         ],
         region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         },
         self: {
            key: 'weihanchen',
            coordinate: {
               latitude: 23.599505,
               longitude: 120.453994
            }
         }
      }
   }
   //api example: https://maps.googleapis.com/maps/api/directions/json?origin=23.599505,120.453994&destination=23.606352,120.456137&key=AIzaSyBrupj_7GBHd1xhgPWnZdtdxTBV8LIfLGM

   componentWillReceiveProps(nextProps) {}

   render() {
      const {travel} = this.props
      return (
         <View style={styles.container}>
            <MapView style={styles.map} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
               <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.skyblue}></Polyline>
               {travel.markers.map(marker => _markerSection(marker))}
            </MapView>
            <View style={styles.buttonContainer}>
               <Icon.Button name="arrows" style={styles.button}></Icon.Button>
               <Icon.Button name="location-arrow" style={styles.button}></Icon.Button>
            </View>
         </View>
      )
   }
}

//private methods
const _markerSection = (marker) => {
   const renderType = {
      self: () => (
         <View style={styles.member}>
            <Icon name='circle' style={styles.selfText}/>
         </View>
      ),
      member: () => (
         <View style={styles.member}>
            <Icon name='user' style={styles.memberText}/>
            <Text style={styles.memberText}>{marker.username}</Text>
         </View>
      ),
      leader: () => (
         <View style={styles.member}>
            <Icon name='user' style={styles.leaderText}/>
            <Text style={styles.leaderText}>{marker.username}</Text>
         </View>
      ),
      endPosition: () => (
         <View style={styles.member}>
            <Icon name='flag' style={styles.endText}/>
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
   travel: PropTypes.object
}

export default TravelMap
