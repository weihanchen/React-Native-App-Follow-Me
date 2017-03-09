'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {
   Animated,
   Dimensions,
   Easing,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   View
} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import MapView, {Callout, Marker, Polyline} from 'react-native-maps'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import * as Animatable from 'react-native-animatable'
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
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         }
      }
   }



   componentWillReceiveProps(nextProps) {
      if (nextProps.travel.status === 'update_region') {
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

   onToggleSideMenu() {
      this.props.handleToggleSideMenu()
   }

   render() {
      const {travel} = this.props

      return (
         <View style={styles.container}>
            <MapView style={styles.map} region={this.state.region} onRegionChange={(region) => this.setState({region})}>
               <Polyline coordinates={travel.directions} strokeWidth={3} strokeColor={mainStyle.color.navy}></Polyline>
               {travel.markers.map(marker => _markerSection(marker))}
            </MapView>
            <View style={styles.topContainer}>
               <TouchableOpacity activeOpacity={0.6} onPress={this.onToggleSideMenu.bind(this)}>
                  <Icon name="bars" reverse color={mainStyle.color.skyblue} type="font-awesome"></Icon>
               </TouchableOpacity>
               <View style={styles.modeContainer}>
                  <TouchableOpacity style={_getModeStyle(travel.mode, 'driving')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'driving')}>
                     <FontAwesomeIcon name="car" style={styles.modeButtonIcon}></FontAwesomeIcon>
                  </TouchableOpacity>
                  <TouchableOpacity style={_getModeStyle(travel.mode, 'bicycling')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'bicycling')}>
                     <FontAwesomeIcon name="bicycle" style={styles.modeButtonIcon}></FontAwesomeIcon>
                  </TouchableOpacity>
                  <TouchableOpacity style={_getModeStyle(travel.mode, 'walking')} activeOpacity={0.6} onPress={this.onChangeMode.bind(this, 'walking')}>
                     <FontAwesomeIcon name="male" style={styles.modeButtonIcon}></FontAwesomeIcon>
                  </TouchableOpacity>
               </View>
            </View>
            <View style={styles.bottomContainer}>
               <View style={styles.toolContainer}>
                  <TouchableOpacity activeOpacity={0.6}>
                     <Icon raised name="bell" color={mainStyle.color.warning} type="font-awesome"></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onRequestDirection.bind(this)}>
                     <Icon raised name="location-arrow" color={mainStyle.color.navy} type="font-awesome"></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} onPress={this.onLocated.bind(this)}>
                     <Icon raised name="arrows" color={mainStyle.color.navy} type="font-awesome"></Icon>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      )
   }
}

//private methods
const _getModeStyle = (activeMode, currentMode) => {
   const results = [styles.modeButton]
   if (activeMode === currentMode)
      results.push(styles.modeButtonActive)
   return results
}

const _markerSection = (marker) => {
   const renderType = {
      self: () => (
         <View style={styles.member}>
            <View style={styles.selfView}>
               <FontAwesomeIcon name='circle' style={styles.selfText}/>
            </View>
         </View>
      ),
      member: () => (
         <View style={styles.member}>
            <Image source={{
               uri: marker.imageUrl
            }} style={styles.memberImage}></Image>
         </View>
      ),
      leader: () => (
         <View style={styles.member}>
            <FoundationIcon name="crown" style={styles.leaderText}></FoundationIcon>
            <Text style={styles.leaderText}>{marker.name}</Text>
         </View>
      ),
      endPosition: () => (
         <View style={styles.member}>
            <FontAwesomeIcon name='flag' style={styles.endText}/>
            <Text style={styles.endText}>{marker.name}</Text>
         </View>
      )
   }
   return (
      <Marker {...marker} title={marker.name}>
         {renderType[marker.type]()}
         <Callout style={styles.calloutView}>
            <Text style={styles.calloutTitle}>{marker.name}</Text>
            <Text style={styles.calloutContent}></Text>
         </Callout>
      </Marker>
   )
}

TravelMap.propTypes = {
   handleChangeMode: PropTypes.func,
   handleRequestDirection: PropTypes.func,
   handleRequestRegion: PropTypes.func,
   handleToggleSideMenu: PropTypes.func,
   travel: PropTypes.object
}

export default TravelMap
