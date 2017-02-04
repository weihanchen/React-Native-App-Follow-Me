'use strict'
import React, {Component, PropTypes} from 'react'
//plugins
import {List, ListItem} from 'react-native-elements'
//stylesheets
import styles from './styles'

class TravelMenu extends Component {
   constructor(props) {
      super(props)
      this.state = {
        members: [
          {
            name:'後衛',
            type: 'leader'
          },
          {
            name: '前鋒',
            type: 'self'
          },
          {
            name: '中鋒',
            type: 'member'
          },
          {
            name: '終點',
            type: 'endPosition'
          }
        ]
      }
   }


   render() {
      return (
         <View style={styles.container}>
            <List>
               {
                 this.state.members.map((map, index) => (
                   <ListItem
                     key={index}
                     title={map.name}
                     />
                 ))
               }
            </List>
         </View>
      )
   }
}

export default TravelMenu
