import React, { Component } from 'react'
import { Text, View, ListView } from 'react-native'
import Button from 'react-native-button';

export default class DirectionsList extends Component {

  _viewMap() {
    this.props.navigator.replace({
      title: 'Map'
    })
  }

  render() {
    return(
      <View>
        <Text> I am not a list</Text>
        <Button
            style={{fontSize: 20, color: 'green'}}
            styleDisabled={{color: 'red'}}
            onPress={() => this._viewMap()}>
            go to map navigator test
        </Button>
      </View>
    )
  }
}
