import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ViewEvent extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>ViewEvent Screen</Text>
            </View>
         );
    }
}
 
export default ViewEvent;