import React, { Component } from 'react'
import { AppRegistry, View, Text } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'

import SearchScene from './scenes/searchScene'
import Map from './components/mapComponent'
import DirectionsList from './components/directionsList'

export default class AppContainer extends Component {
  constructor(){
    super()
  }

  renderScene(route, navigator) {
    console.log('render scene is working. navigator working');
    switch(route.title) {
      case 'Start Trip':
      return <SearchScene navigator={navigator}/>
      break;
      case 'Map':
      return <Map navigator={navigator}/>
      break;
      case 'List':
      return <DirectionsList navigator={navigator}/>
      default:
      return (
        <Text>Hello {route.title}! This is the default case</Text>
      )
    }
  }

  render() {
  return(
      <Navigator
        initialRoute={{ title: 'Start Trip', index: 0 }}
        renderScene={this.renderScene.bind(this)}
        />
    )
  }
}

AppRegistry.registerComponent('AppContainer', () => AppContainer);
