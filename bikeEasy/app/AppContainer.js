import React, { Component } from 'react'
import { AppRegistry, View, Text } from 'react-native'
// import { Navigator } from 'react-native-deprecated-custom-components'
import { StackNavigator } from 'react-navigation'

// converting from navigator to stackNavigator. will return to this later.

import SearchScene from './scenes/searchScene'
import Map from './components/mapComponent'
import DirectionsList from './components/directionsList'
//
// export default class AppContainer extends Component {
//   constructor(){
//     super()
//     this.state = {
//       start: null,
//       end: null
//     }
//   }

  // renderScene(route, navigator) {
  //   console.log('render scene is working. navigator working');
  //   switch(route.title) {
  //     case 'Start Trip':
  //     return <SearchScene navigator={navigator}/>
  //     break;
  //     case 'Map':
  //     return <Map navigator={navigator}/>
  //     break;
  //     default:
  //     return (
  //       <Text>Hello {route.title}! This is the default case</Text>
  //     )
  //   }
  // }

  // configureScene(route, routeStack) {
  //   return Navigator.SceneConfigs.PushFromRight
  // }

//   render() {
//   const { navigate } = this.props.navigation;
//   return(
//       <Navigator
//         initialRoute={{ title: 'Start Trip', passProps: {
//           start: this.state.start,
//           end: this.state.end
//         }}}
//         renderScene={this.renderScene.bind(this)}
//         configureScene={this.configureScene.bind(this)}
//         />
//     )
//   }
// }

const AppContainer = StackNavigator({
  Home: { screen: SearchScene },
  Directions: { screen: Map },
})

AppRegistry.registerComponent('AppContainer', () => AppContainer);
