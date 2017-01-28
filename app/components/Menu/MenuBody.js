'use strict'

import React, {Component, PropTypes} from 'react'
import {Button, View, Text, TouchableOpacity, TouchableHighlight} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
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

   onSetting() {}

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity onPress={this.onCreateGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
               <View style={styles.itemContainer}>
                  <View style={styles.itemIcon}>
                     <Icon name="users" style={styles.icon}/>
                  </View>
                  <View>
                     <Text style={styles.itemTitle}>創建群組</Text>
                     <Text style={styles.itemSubTitle}>群組名稱、用戶ID、結束時間、終點</Text>
                  </View>
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onAddGroup.bind(this)} style={styles.item} activeOpacity={0.8}>
               <View style={styles.itemContainer}>
                  <View style={styles.itemIcon}>
                     <Icon name="plus" style={styles.icon}/>
                  </View>
                  <View>
                     <Text style={styles.itemTitle}>加入群組</Text>
                     <Text style={styles.itemSubTitle}>根據ID加入、搜尋群組名稱</Text>
                  </View>
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onSetting.bind(this)} style={styles.item} activeOpacity={0.8}>
               <View style={styles.itemContainer}>
                  <View style={styles.itemIcon}>
                     <Icon name="question" style={styles.icon}/>
                  </View>
                  <View>
                     <Text style={styles.itemTitle}>說明</Text>
                  </View>
               </View>
            </TouchableOpacity>
         </View>
      )
   }
}

MenuBody.propTypes = {
   navigateToAddToGroup: PropTypes.func,
   navigateToCreateGroup: PropTypes.func
}

export default MenuBody
