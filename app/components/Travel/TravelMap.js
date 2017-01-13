'use strict'
import React, {
   Component,
   PropTypes
} from 'react'
//plugins
import {
  Dimensions,
  Text,
  View
} from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
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
            latitude: 23.5995618,
            longitude: 120.4539282
          },
          {
            latitude: 23.5989997,
            longitude: 120.4521823
          },
          {
            latitude: 23.5999215,
            longitude: 120.4512186
          },
          {
            latitude: 23.6007993,
            longitude: 120.4504531
          },{
            latitude: 23.6019542,
            longitude: 120.450971
          },{
            latitude: 23.602096,
            longitude: 120.4532781
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
          },
          {
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
   render() {
      return (
        <MapView style={styles.container} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
          <Polyline coordinates={this.state.directions} strokeWidth={3} strokeColor={mainStyle.color.skyblue}></Polyline>
          <Marker {...this.state.self}>
            <View style={styles.member}>
              <Icon name='user' style={styles.selfText}/>
              <Text style={styles.selfText}>{this.state.self.key}</Text>
            </View>
          </Marker>
          <Marker {...this.state.end}>
            <View style={styles.end}>
              <Icon name='flag' style={styles.endText}/>
              <Text style={styles.endText}>{this.state.end.key}</Text>
            </View>
          </Marker>
          {this.state.members.map(member => (
            <Marker {...member}>
              <View style={styles.member}>
                <Icon name='user' style={styles.memberText}/>
                <Text style={styles.memberText}>{member.key}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      )
   }
}

export default TravelMap
