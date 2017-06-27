import React, { Component } from 'react'
import { View, Text, TextInput, Icon, Picker } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import Button from 'react-native-button';


export default class SearchInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      start: 'start ',
      end: 'end',
      depart: Date.now()
    }
}

  _handlePress() {
    this.props.navigator.replace({
        title: 'Map'
      })
    }

  _useLocation() {
    // use geolocation api hereeeeeeee

  }

  render(){
    return(
      <View>
      <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._useLocation()}>
          use my location
      </Button>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={start => this.setState({start})}
            value={this.state.start}
          />
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={end => this.setState({end})}
              value={this.state.end}
            />
          <Button
              style={{fontSize: 20, color: 'green'}}
              styleDisabled={{color: 'red'}}
              onPress={() => this._handlePress()}>
              Go!
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
