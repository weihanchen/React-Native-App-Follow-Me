'use strict'

import React, {Component, PropTypes} from 'react'
import {Button, View, Text, TouchableOpacity, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import {LANGUAGE_KEY} from '../../config'
class MenuBody extends Component {
   constructor(props) {
      super(props)
   }
   componentDidMount() {}
   componentWillUnmount() {}

   onAddGroup() {
      this.props.navigateToAddToGroup();
   }

   onCreateGroup() {
      this.props.navigateToCreateGroup();
   }

   onEnterMap() {}

   render() {
      const {isIdentify} = this.props
      let menuSection = (
         <View>
            <TouchableOpacity onPress={this.onCreateGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
               <View style={styles.itemContainer}>
                  <View style={styles.itemIcon}>
                     <Icon name="users" style={styles.icon}/>
                  </View>
                  <View>
                     <Text style={styles.itemTitle}>{LANGUAGE_KEY.CREATE_GROUP}</Text>
                     <Text style={styles.itemSubTitle}>{LANGUAGE_KEY.CREATE_GROUP_SUBTITLE}</Text>
                  </View>
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onAddGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
               <View style={styles.itemContainer}>
                  <View style={styles.itemIcon}>
                     <Icon name="plus" style={styles.icon}/>
                  </View>
                  <View>
                     <Text style={styles.itemTitle}>{LANGUAGE_KEY.JOIN_GROUP}</Text>
                     <Text style={styles.itemSubTitle}>{LANGUAGE_KEY.JOIN_GROUP_SUBTITLE}</Text>
                  </View>
               </View>
            </TouchableOpacity>
         </View>
      )
      if (isIdentify) {
         menuSection = (
            <View>
               <TouchableOpacity onPress={this.onEnterMap.bind(this)} style={styles.item} activeOpacity={0.8}>
                  <View style={styles.itemContainer}>
                     <View style={styles.itemIcon}>
                        <Icon name="map-o" style={styles.icon}/>
                     </View>
                     <View>
                        <Text style={styles.itemTitle}>{LANGUAGE_KEY.ENTER_MAP}</Text>
                        <Text style={styles.itemSubTitle}>{LANGUAGE_KEY.ENTER_MAP_SUBTITLE}</Text>
                     </View>
                  </View>
               </TouchableOpacity>
            </View>
         )
      }

      return (
         <View style={styles.container}>
            {menuSection}
         </View>
      )
   }
}

MenuBody.propTypes = {
   isIdentify: PropTypes.bool,
   navigateToAddToGroup: PropTypes.func,
   navigateToCreateGroup: PropTypes.func
}

export default MenuBody
