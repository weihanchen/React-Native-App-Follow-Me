'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {Dimensions, Text, View} from 'react-native'
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
         directions: [
            {
               latitude: 23.59956,
               longitude: 120.45393
            }, {
               latitude: 23.59939,
               longitude: 120.45373
            }, {
               latitude: 23.59921,
               longitude: 120.45349
            }, {
               latitude: 23.59908,
               longitude: 120.45317
            }, {
               latitude: 23.599,
               longitude: 120.45279
            }, {
               latitude: 23.599,
               longitude: 120.45259
            }, {
               latitude: 23.59903,
               longitude: 120.45238
            }, {
               latitude: 23.59903,
               longitude: 120.45223
            }, {
               latitude: 23.599,
               longitude: 120.45218
            }, {
               latitude: 23.59983,
               longitude: 120.45141
            }, {
               latitude: 23.59991,
               longitude: 120.45133
            }, {
               latitude: 23.59993,
               longitude: 120.45127
            }, {
               latitude: 23.59992,
               longitude: 120.45122
            }, {
               latitude: 23.60001,
               longitude: 120.45115
            }, {
               latitude: 23.60012,
               longitude: 120.45109
            }, {
               latitude: 23.6008,
               longitude: 120.45045
            }, {
               latitude: 23.60195,
               longitude: 120.45097
            }, {
               latitude: 23.60321,
               longitude: 120.45173
            }, {
               latitude: 23.60425,
               longitude: 120.45235
            }, {
               latitude: 23.60468,
               longitude: 120.45259
            }, {
               latitude: 23.60564,
               longitude: 120.45319
            }, {
               latitude: 23.60579,
               longitude: 120.45325
            }, {
               latitude: 23.60584,
               longitude: 120.45326
            }, {
               latitude: 23.60589,
               longitude: 120.45326
            }, {
               latitude: 23.6059,
               longitude: 120.45334
            }, {
               latitude: 23.60616,
               longitude: 120.45517
            }, {
               latitude: 23.6063,
               longitude: 120.45597
            }, {
               latitude: 23.60633,
               longitude: 120.45614
            }
         ],
         end: {
            key: '終點',
            coordinate: {
               latitude: 23.602298,
               longitude: 120.453306
            }
         },
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
         <MapView style={styles.container} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
            <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.skyblue}></Polyline>
            {travel.markers.map(marker => _markerSection(marker))}
         </MapView>
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
