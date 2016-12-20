'use strict';

import React from 'react'
import {
  View,
  Text
} from 'react-native'

//components
import {
  MenuBody
} from '../components/Menu'

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    return (
      <View style={{flex:1}}>
        <MenuBody></MenuBody>
      </View>
    );
  }
}
export default MenuContainer;
