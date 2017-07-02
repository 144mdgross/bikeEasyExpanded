import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker, Dimensions } from 'react-native'
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
    <View style={styles.back}>
      <SearchInputs style={styles.search}/>
      <Button
          style={styles.go}
          styleDisabled={{color: 'red'}}
          onPress={() => this._go()}>
          go
      </Button>
      <Picker
           selectedValue={this.state.depart}
           onValueChange={(time) => this.setState({depart: time})}>
           <Picker.Item label="Java" value="java" />
           <Picker.Item label="JavaScript" value="js" />
         </Picker>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  go: {
    marginTop: 10,
    fontSize: 20,
    color: 'green',
  },
  search: {
    width: Dimensions.get('window').width * .9,
  },
  back: {
    // backgroundColor: 'rgba(139, 4, 33, 0.86)',
    height: Dimensions.get('window').height,
  }
})
