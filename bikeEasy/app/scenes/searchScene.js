import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker, Dimensions } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Button from 'react-native-button';

import SearchInputs from '../components/searchInputs'

export default class SearchScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      depart: Date.now()
    }
  }

  _go() {
    this.props.navigator.replace({
      title: 'Map',
      passProps: this.props
    })
  }

  render(){
    return(
    <View>
      <SearchInputs/>
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
  }
})
