import React, { Component } from 'react'
import { Navigator, AppRegistry, View, Text } from 'react-native'

export default class AppContainer extends Component {
  constructor(){
    super()
  }

  render() {
  return(
    <View>
      <Text> I am working! </Text>
    </View>
    )
  }

}

AppRegistry.registerComponent('AppContainer', () => AppContainer);
