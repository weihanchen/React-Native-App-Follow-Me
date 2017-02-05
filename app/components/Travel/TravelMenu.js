'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {View} from 'react-native'
import {Button, List, ListItem} from 'react-native-elements'
//stylesheets
import styles from './styles'
import mainStyle from '../../stylesheets'

class TravelMenu extends Component {
   constructor(props) {
      super(props)
      this.state = {
         members: [
            {
               name: '後衛',
               type: 'leader'
            }, {
               name: '前鋒',
               type: 'self'
            }, {
               name: '中鋒',
               type: 'member'
            }, {
               name: '終點',
               type: 'endPosition'
            }
         ]
      }
   }

   onLeaveGroup() {
      this.props.handleLeaveGroup()
   }

   render() {
      return (
         <View style={styles.container}>
            <List>
               {this.state.members.map((map, index) => (<ListItem key={index} title={map.name}/>))}
            </List>
            <Button reverse title="離開隊伍" backgroundColor={mainStyle.color.danger} borderRadius={mainStyle.radius.medium} icon={{
               name: 'sign-out',
               type: 'font-awesome'
            }} onPress={this.onLeaveGroup.bind(this)}></Button>

         </View>
      )
   }
}

TravelMenu.propTypes = {
   handleLeaveGroup: PropTypes.func
}

export default TravelMenu
