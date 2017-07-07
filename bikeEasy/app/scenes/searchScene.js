import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker, Dimensions, Image } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Button from 'react-native-button';

import SearchInputs from '../components/searchInputs'
import Storage from '../stores/directionsStore.js'

export default class SearchScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      depart: Date.now()
    }
  }

  _go() {
    this.props.navigator.push({
      title: 'Map',
      passProps: this.props
    })
  }

  render(){
    return(
  <Image source={require('../../images/Eaton_Speedwell.png')} style={styles.back}>
    <View>

      <SearchInputs style={styles.search}/>
      <Button
          containerStyle={styles.buttonContainer}
          styleDisabled={{color: 'red'}}
          onPress={() => this._go()}>
          <Text style={styles.go}>go</Text>
      </Button>
    </View>
  </Image>
    )
  }
}

const styles = StyleSheet.create({
  go: {
    // marginTop: 50,
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
  },
  search: {
    width: Dimensions.get('window').width * .9,
  },
  buttonContainer: {
    marginTop: 10,
    // padding:10,
    height:45,
    width: 90,
    alignSelf: 'center',
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'rgba(0, 0, 0, .85)',
  },
  back: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
  }
})
