import React, { Component } from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Body,Card,CardItem,Right} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Tab3 extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={styles.container}>
                  <Card>
            <CardItem>
              <Icon active name="md-create" style={{ color: "#38adff" }}/>
              <Text style={styles.CreateGrpText}>Create Group</Text>
              <Right>
                {/* <Icon name="md-create" /> */}
              </Right>
             </CardItem>
           </Card>
                <Card primary>
{/* <CardItem header bordered style={{ backgroundColor: 'lightgray' }}> */}
    <CardItem header bordered>
      <Text>Group Name</Text>
    </CardItem>
    <CardItem bordered>
      <Body>
        <Text>
          NativeBase is a free and open source framework that enable
          developers to build
          high-quality mobile apps using React Native iOS and Android
          apps
          with a fusion of ES6.
        </Text>
      </Body>
    </CardItem>
    <CardItem footer bordered footer button onPress={() => this.props.navigation.navigate('EventView')}>
        <Text>View</Text>
        <Right>
                <Icon name="arrow-forward" />
        </Right>
      </CardItem>
  </Card>

            </View>
         );
    }
}
 
export default Tab3;

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 10,
  },
  CreateGrpText: {
    color: 'blue',
    // fontSize: hp('3%'),
  },
});
