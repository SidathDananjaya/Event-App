import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';

export class Home extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>This is the home screen</Text>
        <Button title="Go to Setting Page" color="#2196F3" onPress={() => navigate('Settings')}/>
      </View>
    )
  }
}

export default Home