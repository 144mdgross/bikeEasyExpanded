import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Button from 'react-native-button'

import SearchInput from '../components/searchInputs'

export default class SearchScene extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <ScrollView>
        <SearchInput/>
        <SearchInput/>
      </ScrollView>
    )
  }



}
