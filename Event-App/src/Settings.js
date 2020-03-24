import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class Settings extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>This is the Settings screen</Text>
        <Button
          title="Back"
          onPress={() => navigate('Home')}
          color="#737d87"
        />
      </View>
    )
  }
};

export default Settings;