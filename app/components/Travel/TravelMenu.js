'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {ScrollView, TouchableOpacity, View} from 'react-native'
import {Button, List, ListItem} from 'react-native-elements'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'
//config
import {
   LANGUAGE_KEY,
   MARKER_TYPE
} from '../../config'

class TravelMenu extends Component {
   constructor(props) {
      super(props)
   }

   shouldComponentUpdate(nextProps, nextState) {
      return nextProps.isMenuOpen !== this.props.isMenuOpen;
   }

   onLeaveGroup() {
      this.props.handleLeaveGroup()
   }

   render() {
      const {travel} = this.props
      return (
         <View style={styles.menuContainer}>
            <View style={styles.menuTop}>
               <ListItem key={10000} title={'Weihanchen'} roundAvatar={true} avatar={{
                  uri: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c47.0.160.160/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?oh=7f3dfacc99a506cd7759421da479c6c7&oe=59444149'
               }} hideChevron={true}></ListItem>
            </View>
            <ScrollView>
               <List>
                  {
                    travel.markers.filter(marker => marker.type !== MARKER_TYPE.SELF)
                                  .map((marker, index) => _markerSection(marker, index))
                  }
               </List>
            </ScrollView>
            <View style={styles.menuBottom}>
               <Button reverse title={LANGUAGE_KEY.LEAVE_GROUP} backgroundColor={mainStyle.color.danger} borderRadius={mainStyle.radius.medium} icon={{
                  name: 'sign-out',
                  type: 'font-awesome'
               }} onPress={this.onLeaveGroup.bind(this)} Component={TouchableOpacity}></Button>
            </View>
         </View>
      )
   }
}

const _markerSection = (marker, index) => {
   const isActive = marker.isActive
   if (!isActive) return (<ListItem key={index} roundAvatar={true}  title={marker.name}/>)
   else return (<ListItem key={index} roundAvatar={true}  title={marker.name} containerStyle={styles.modeButtonActive}/>)
}

TravelMenu.propTypes = {
   handleLeaveGroup: PropTypes.func,
   isMenuOpen: PropTypes.bool,
   travel: PropTypes.object
}

export default TravelMenu
